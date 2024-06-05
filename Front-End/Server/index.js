/*
Para iniciar o projeto o primeiro passo é rodar o comando dentro da pasta Server
npm init -y

Depois para instalar as bibliotecas digite
npm pg express dotenv


*/


const express = require('express'); // A biblioteca 'express' serve para criar o servidor web
const app = express(); // Cria uma instância do aplicativo Express.

const client = require('./db.js'); // Importa o módulo 'db.js' que lida com o banco de dados

app.use(express.json());  // Habilita o middleware 'express.json()' para analisar solicitações JSON

// Cria uma rota de método POST para inserir dados no SQL
app.post('/api/data', async (req, res) => {
    const { tipo, valor, descricao, data } = req.body;  // Extrai os valores do corpo da solicitação JSON

    try {
        // A função reservada .query é específica para dar instruções para o SQL
        const result = await client.query('INSERT INTO despesas.saidas(tipo, valor, descricao, data) VALUES ($1, $2, $3, $4) RETURNING *', [tipo, valor, descricao, data]);
        res.json(result.rows[0]);  // Responde com os dados inseridos no formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });  // Em caso de erro, responde com um erro interno do servidor.
    }
});

app.listen(3000, () => console.log('Server is running on port 3000')); // Avisa para a aplicação  em qual porta a API está rodando