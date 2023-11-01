document.addEventListener('DOMContentLoaded', function () {
  const maxLinks = 5;
  const addLinkButton = document.getElementById('addLinkButton');
  const containerRight = document.querySelector('.container-right');
  const backgroundColorInput = document.getElementById('backgroundColor');
  const imageUpload = document.getElementById('imageUpload');
  const imageContainer = document.querySelector('.circular-image-container');
  let linkCount = 0;

  function createNewLink(name, url) {
    if (linkCount < maxLinks) {
      linkCount++;
      const newLinkItem = document.createElement('li');
      const newLink = document.createElement('a');
      newLink.href = url;
      newLink.target = '_blank';
      newLink.textContent = name;
      newLinkItem.appendChild(newLink);
      containerRight.appendChild(newLinkItem);
      makeDraggable(newLinkItem);
    } else {
      alert('Você atingiu o limite de links (5).');
    }
  }

  function makeDraggable(element) {
    let isDragging = false;

    interact(element)
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true,
          }),
        ],
        autoScroll: true,
      })
      .on('dragstart', function () {
        isDragging = true;
        // Desativar os links durante o arraste
        disableLinks(element);
      })
      .on('dragmove', function (event) {
        const target = event.target;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      })
      .on('dragend', function () {
        isDragging = false;
        // Reativar os links após o término do arraste
        enableLinks(element);
      });

    // Adicione um ouvinte de evento 'click' ao link âncora (<a>)
    const link = element.querySelector('a');

    if (link) {
      link.addEventListener('click', function (event) {
        if (isDragging) {
          event.preventDefault();
        }
      });
    }
  }

  function disableLinks(element) {
    const links = element.querySelectorAll('a');
    links.forEach((link) => {
      link.style.pointerEvents = 'none';
    });
  }

  function enableLinks(element) {
    const links = element.querySelectorAll('a');
    links.forEach((link) => {
      link.style.pointerEvents = 'auto';
    });
  }

  function changeBackgroundColor() {
    const color = backgroundColorInput.value;
    containerRight.style.backgroundColor = color;
  }

  function loadAndDisplayImage() {
    const file = imageUpload.files[0];

    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const image = document.createElement('img');
          image.classList.add('circular-image');
          image.src = e.target.result;

          imageContainer.innerHTML = '';
          imageContainer.appendChild(image);
        };

        reader.readAsDataURL(file);
      } else {
        alert(
          'Por favor, selecione um arquivo de imagem válido (PNG, JPG, etc.).'
        );
      }
    }
  }

  addLinkButton.addEventListener('click', function () {
    const linkNameInput = document.getElementById('linkName');
    const linkURLInput = document.getElementById('linkURL');
    const linkName = linkNameInput.value;
    const linkURL = linkURLInput.value;

    if (linkName && linkURL) {
      createNewLink(linkName, linkURL);
      linkNameInput.value = '';
      linkURLInput.value = '';
    } else {
      alert('Preencha ambos os campos: Nome do Link e URL do Link.');
    }
  });

  backgroundColorInput.addEventListener('input', changeBackgroundColor);
  imageUpload.addEventListener('change', loadAndDisplayImage);
});
