document.addEventListener('DOMContentLoaded', function () {
  // Número máximo de links permitidos
  const maxLinks = 5;

  // Referência ao botão "Adicionar Link"
  const addLinkButton = document.getElementById('addLinkButton');

  // Referência à lista de links
  const linksList = document.querySelector('.links');

  // Referência aos campos de entrada
  const linkNameInput = document.getElementById('linkName');
  const linkURLInput = document.getElementById('linkURL');

  // Contador de links criados
  let linkCount = 0;

  // Referência ao .container-right
  const containerRight = document.querySelector('.container-right');

  // Referência ao campo de seleção de cor de fundo
  const backgroundColorInput = document.getElementById('backgroundColor');

  // Referência ao campo de upload de imagem
  const imageUpload = document.getElementById('imageUpload');

  // Referência ao elemento onde a imagem será exibida
  const imageContainer = document.querySelector('.circular-image-container');

  // Função para criar um novo link com base nos campos de entrada
  function createNewLink() {
    if (linkCount < maxLinks) {
      linkCount++;

      // Obtém o nome e o URL dos campos de entrada
      const linkName = linkNameInput.value;
      const linkURL = linkURLInput.value;

      // Certifique-se de que ambos os campos tenham valores
      if (linkName && linkURL) {
        // Cria um novo elemento <li> para o link
        const newLinkItem = document.createElement('li');

        // Cria um novo elemento <a> dentro do <li> com base nos valores dos campos de entrada
        const newLink = document.createElement('a');
        newLink.href = linkURL;
        newLink.textContent = linkName;

        // Adiciona o link ao <li>
        newLinkItem.appendChild(newLink);

        // Adiciona o <li> à lista de links
        linksList.appendChild(newLinkItem);

        // Limpa os campos de entrada após a criação do link
        linkNameInput.value = '';
        linkURLInput.value = '';
      } else {
        alert('Preencha ambos os campos: Nome do Link e URL do Link.');
      }
    } else {
      alert('Você atingiu o limite de links (5).');
    }
  }

  // Função para alterar a cor de fundo do .container-right
  function changeBackgroundColor() {
    const color = backgroundColorInput.value;
    containerRight.style.backgroundColor = color;
  }

  // Função para carregar e exibir a imagem selecionada
  function loadAndDisplayImage() {
    const file = imageUpload.files[0];

    if (file) {
      // Verifica se o arquivo é uma imagem
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function (e) {
          // Cria uma imagem e define sua classe
          const image = document.createElement('img');
          image.classList.add('circular-image');

          // Define a imagem carregada como a fonte da imagem
          image.src = e.target.result;

          // Remove qualquer imagem existente e adiciona a nova imagem ao contêiner
          imageContainer.innerHTML = '';
          imageContainer.appendChild(image);
        };

        // Lê o arquivo de imagem selecionado
        reader.readAsDataURL(file);
      } else {
        alert(
          'Por favor, selecione um arquivo de imagem válido (PNG, JPG, etc.).'
        );
      }
    }
  }

  // Adiciona um ouvinte de eventos ao botão "Adicionar Link"
  addLinkButton.addEventListener('click', createNewLink);

  // Adiciona um ouvinte de eventos ao campo de seleção de cor de fundo
  backgroundColorInput.addEventListener('input', changeBackgroundColor);

  // Adiciona um ouvinte de eventos ao campo de upload de imagem
  imageUpload.addEventListener('change', loadAndDisplayImage);
});
