let memories = [];
const cardContainer = document.querySelector('.card-container');
let currentIndex = 0;

// Modal
const modal = document.createElement('div');
modal.className = 'user-modal';
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <img class="modal-img" src="" alt="">
    <h2 class="modal-name"></h2>
    <p class="modal-characteristics"></p>
    <p class="modal-capacities"></p>
    <p class="modal-uses"></p>
    <p class="modal-others"></p>
    <p class="modal-assigned"></p>
  </div>
`;
document.body.appendChild(modal);

function showCard(index) {
  if (index >= memories.length) {
    cardContainer.innerHTML = `<p class="no-more-cards">No hay más perfiles disponibles</p>`;
    return;
  }

  const memory = memories[index];
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <img src="${memory.imagen}" alt="${memory.nombre}" class="card-image">
    <h2 class="card-title">${memory.nombre}</h2>
    <p class="card-description">${memory.caracteristicas.join(', ')}</p>
    <div class="card-actions">
      <button class="action-btn dislike">✖</button>
      <button class="action-btn like">❤</button>
      <button class="action-btn info">ℹ</button>
    </div>
  `;

  cardContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar la nueva tarjeta
  cardContainer.appendChild(card);

  // Botones de acción
  const dislikeBtn = card.querySelector('.dislike');
  const likeBtn = card.querySelector('.like');
  const infoBtn = card.querySelector('.info');

  dislikeBtn.onclick = () => swipeCard(card, 'left');
  likeBtn.onclick = () => swipeCard(card, 'right');
  infoBtn.onclick = () => showModal(memory);
}

function swipeCard(card, direction) {
  card.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
  card.style.opacity = '0';
  card.style.transform =
    direction === 'right'
      ? 'translateX(500px) rotate(20deg)'
      : 'translateX(-500px) rotate(-20deg)';

  // Esperar a que la animación termine antes de mostrar la siguiente tarjeta
  card.addEventListener(
    'transitionend',
    () => {
      currentIndex++;
      showCard(currentIndex);
    },
    { once: true }
  );
}

function showModal(memory) {
  modal.querySelector('.modal-img').src = memory.imagen;
  modal.querySelector('.modal-name').textContent = memory.nombre;
  modal.querySelector('.modal-characteristics').textContent = `Características: ${memory.caracteristicas.join(', ')}`;
  modal.querySelector('.modal-capacities').textContent = `Capacidades: ${memory.capacidades}`;
  modal.querySelector('.modal-uses').textContent = `Usos: ${memory.usos}`;
  modal.querySelector('.modal-others').textContent = `Otros: ${memory.otros}`;

  modal.classList.add('show');
}

modal.querySelector('.close-btn').onclick = () => {
  modal.classList.remove('show');
};

async function loadMemories() {
  try {
    const response = await fetch('src/memories/memories.json');
    memories = await response.json();
    showCard(currentIndex);
  } catch (error) {
    console.error('Error al cargar las memorias:', error);
  }
}

loadMemories();