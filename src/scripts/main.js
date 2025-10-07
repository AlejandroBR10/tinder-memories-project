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
  try {
    const response = await fetch('src/memories/memories.json');
    if (!response.ok) {
      throw new Error(`Error al cargar el JSON: ${response.status}`);
    }
    memories = await response.json();

    // Verificar si hay datos en el JSON
    if (memories.length === 0) {
      cardContainer.innerHTML = '<h2>No hay perfiles disponibles</h2>';
      return;
    }

    // Mostrar la primera tarjeta
    showCard(currentIndex);
  } catch (error) {
    console.error('Error al cargar las memorias:', error);
    cardContainer.innerHTML = '<h2>Error al cargar los datos</h2>';
  }
}

function showHeartAnimation(type) {
  const heartAnimation = document.createElement('div');
  heartAnimation.className = 'heart-animation';
  heartAnimation.textContent = type;

  // Estilo dinámico para la animación
  heartAnimation.style.position = 'fixed';
  heartAnimation.style.top = '50%';
  heartAnimation.style.left = '50%';
  heartAnimation.style.transform = 'translate(-50%, -50%)';
  heartAnimation.style.fontSize = '4rem';
  heartAnimation.style.color = type === '❤' ? '#ff6a6a' : '#555';
  heartAnimation.style.opacity = '1';
  heartAnimation.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
  heartAnimation.style.zIndex = '1000';

  document.body.appendChild(heartAnimation);

  // Animación de desvanecimiento y movimiento hacia arriba
  setTimeout(() => {
    heartAnimation.style.opacity = '0';
    heartAnimation.style.transform = 'translate(-50%, -60%)';
  }, 500);

  // Eliminar el elemento después de la animación
  setTimeout(() => {
    heartAnimation.remove();
  }, 1500);
}

function handleSwipe(memory, direction) {
  if (direction === 'right') {
    addToFavorites(memory); // Agregar a favoritos
    showHeartAnimation('❤'); // Mostrar animación de corazón
  } else if (direction === 'left') {
    showHeartAnimation('💔'); // Mostrar animación de corazón roto
  }
}

function addToFavorites(memory) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const isFavorite = favorites.some((fav) => fav.id === memory.id);

  if (!isFavorite) {
    favorites.push(memory);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
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

  // Configurar eventos dinámicamente para cada botón
  likeBtn.onclick = () => {
    handleSwipe(memory, 'right'); // Swipe hacia la derecha
    swipeCard(card, 'right');
  };

  dislikeBtn.onclick = () => {
    handleSwipe(memory, 'left'); // Swipe hacia la izquierda
    swipeCard(card, 'left');
  };

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
    card.style.transform = `translateX(${diffX}px) rotate(${diffX / 10}deg)`;
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