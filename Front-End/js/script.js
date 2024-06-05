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


  const url = `http://localhost:3000/api/data`;
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
      console.log()
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



const add = document.querySelector('.add')

let toastContainer;

function generateToast({
  message = 'Value added',
  background = '#00214d',
  color = '#fffffe',
  length = '3000ms',
}){
  toastContainer.insertAdjacentHTML('beforeend', `<p class="toast" 
    style="background-color: ${background};
    color: ${color};
    animation-duration: ${length}">
    ${message}
  </p>`)
  const toast = toastContainer.lastElementChild;
  toast.addEventListener('animationend', () => toast.remove())
}

(function initToast(){
  document.body.insertAdjacentHTML('afterbegin', `<div class="toast-container"></div>
  <style>
  
  .toast-container {
    position: fixed;
    bottom: 4rem;
    right: 25rem;
    display: grid;
    justify-items: end;
    gap: 1.5rem;
  }
  
  .toast {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1;
    padding: 0.5em 1em;
    background-color: lightblue;
    animation: toastIt 3000ms cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards;
    right: 1.5rem;
  }
  
  @keyframes toastIt {
    0%,
    100% {
      transform: translateY(-150%);
      opacity: 0;
    }
    10%,
    90% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  </style>
  `);
  toastContainer = document.querySelector('.toast-container');
})()

add.addEventListener('click', (e) => {
  // Generate the toast message
  generateToast({
    message: 'Value added',
    background: "hsl(171 100% 46.1%)",
    color: "hsl(171 100% 13.1%)",
    length: "5000ms",
  })

  // Prevent the form from submitting
  e.preventDefault();
})