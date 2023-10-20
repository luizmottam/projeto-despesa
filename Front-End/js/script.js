// Function to create and display a card with a specified message and color
function createCard(message, color) {
  const cardDiv = document.getElementById('card');
  cardDiv.style.display = 'block'; // Show the card
  cardDiv.style.backgroundColor = color; // Set the card's background color
  cardDiv.innerHTML = `<img src="img/symbol-${color === 'green' ? 'positive' : 'negative'}.png"> <p>${message}</p>`;
  
  // Automatically hide the card after a few seconds (adjust the delay as needed)
  setTimeout(function () {
    cardDiv.style.display = 'none';
  }, 5000); // 5000 milliseconds (5 seconds) in this example
}

// Adiciona um ouvinte de evento de envio de formulário ao elemento com ID 'expense'
document.getElementById('expense').addEventListener('submit', function(event) {
  event.preventDefault();  // Impede o envio padrão do formulário.
  // Obtém o valor da entrada com ID "valor" e o limpa, removendo "R$" e espaços em branco
  const valueString = document.getElementById("valor").value;
  const cleanedText = valueString.replace('R$', '').trim();
  const valor = parseFloat(cleanedText);

   // Envia uma solicitação POST para a URL especificada com os dados do formulário em formato JSON
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      // Cria um body JSON com informações do formulário
      body: JSON.stringify({
          tipo: document.getElementById('tipo').value,
          valor: valor,
          descricao: document.getElementById('descr').value,
          data: document.getElementById('data').value
      })
  })
  .then(response => {
    if (response.ok) {
      // Se a resposta da requisição for bem-sucedida, mostra um card de sucesso
      createCard('Dados adicionados com sucesso', 'green');
      // Reset the form after successful submission
      document.getElementById("tipo").value = "";
      document.getElementById("valor").value = "";
      document.getElementById("descr").value = "";
      document.getElementById("data").value = "";
    } else {
      // Se houver um erro na resposta, mostra um card de erro
      createCard('Dados não enviados', 'red');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    // Se ocorrer um erro na requisição, mostra um card de erro
    createCard('Dados não enviados', 'red');
  });
});