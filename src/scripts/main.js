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

function showModal(memory) {
  modal.querySelector('.modal-img').src = memory.imagen;
  modal.querySelector('.modal-name').textContent = memory.nombre;
  modal.querySelector('.modal-characteristics').textContent =
    memory.caracteristicas && memory.caracteristicas.length
      ? `Características: ${memory.caracteristicas.join(', ')}`
      : '';
  modal.querySelector('.modal-capacities').textContent =
    memory.capacidades ? `Capacidades: ${memory.capacidades}` : '';
  modal.querySelector('.modal-uses').textContent =
    memory.usos ? `Usos: ${memory.usos}` : '';
  modal.querySelector('.modal-others').textContent =
    memory.otros ? `Otros: ${memory.otros}` : '';
  modal.querySelector('.modal-assigned').textContent =
    memory.asignado ? `Asignado a: ${memory.asignado}` : '';
  modal.classList.add('show');
}

modal.querySelector('.close-btn').onclick = () => {
  modal.classList.remove('show');
};

async function loadMemories() {
  const res = await fetch('src/memories/memories.json');
  memories = await res.json();
  showCard(currentIndex);
}

function showCard(index) {
  cardContainer.innerHTML = '';
  if (index >= memories.length) {
    cardContainer.innerHTML = '<h2>No more profiles!</h2>';
    return;
  }

  const memory = memories[index];
  const card = document.createElement('div');
  card.classList.add('user-card');

  const img = document.createElement('img');
  img.src = memory.imagen;
  img.alt = memory.nombre;

  const name = document.createElement('h2');
  name.textContent = memory.nombre;

  // Características resumidas en la carta
  const characteristics = document.createElement('p');
  characteristics.className = 'card-characteristics';
  if (memory.caracteristicas && memory.caracteristicas.length) {
    characteristics.textContent = memory.caracteristicas.slice(0, 2).join(', ');
  }

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const dislikeBtn = document.createElement('button');
  dislikeBtn.className = 'action-btn dislike';
  dislikeBtn.innerHTML = '✖';

  const likeBtn = document.createElement('button');
  likeBtn.className = 'action-btn like';
  likeBtn.innerHTML = '❤';

  const infoBtn = document.createElement('button');
  infoBtn.className = 'action-btn info';
  infoBtn.innerHTML = '<span class="info-icon">ℹ️</span>';

  actions.appendChild(dislikeBtn);
  actions.appendChild(likeBtn);
  actions.appendChild(infoBtn);

  card.appendChild(img);
  card.appendChild(name);
  if (characteristics.textContent) card.appendChild(characteristics);
  card.appendChild(actions);
  cardContainer.appendChild(card);

  likeBtn.onclick = () => swipeCard(card, 'right');
  dislikeBtn.onclick = () => swipeCard(card, 'left');
  infoBtn.onclick = () => showModal(memory);

  // Drag/swipe functionality
  let startX = 0, currentX = 0, isDragging = false;

  function onStart(e) {
    isDragging = true;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    card.style.transition = 'none';
  }

  function onMove(e) {
    if (!isDragging) return;
    currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    let diffX = currentX - startX;
    card.style.transform = `translateX(${diffX}px) rotate(${diffX/10}deg)`;
  }

  function onEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    let diffX = currentX - startX;
    card.style.transition = 'transform 0.3s';
    if (diffX > 100) {
      swipeCard(card, 'right');
    } else if (diffX < -100) {
      swipeCard(card, 'left');
    } else {
      card.style.transform = '';
    }
  }

  card.addEventListener('mousedown', onStart);
  card.addEventListener('touchstart', onStart);

  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchmove', onMove);

  document.addEventListener('mouseup', onEnd);
  document.addEventListener('touchend', onEnd);
}

function swipeCard(card, direction) {
  card.style.transition = 'transform 0.5s, opacity 0.5s';
  card.style.opacity = '0';
  card.style.transform = direction === 'right'
    ? 'translateX(500px) rotate(30deg)'
    : 'translateX(-500px) rotate(-30deg)';
  setTimeout(() => {
    currentIndex++;
    showCard(currentIndex);
  }, 350);
}

loadMemories();