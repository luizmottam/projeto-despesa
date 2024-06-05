const { Client } = require('pg'); // Carrega o pacote Client da biblioteca pg

// Fazendo a conexão com o banco
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '#backtest!1',
    port: 5432,
});

client.connect(); // Executando a conexão

module.exports = client; // Exporta a função, deixa ela visível 