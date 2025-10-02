let users = [];
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
    <p class="modal-food"></p>
  </div>
`;
document.body.appendChild(modal);

function showModal(user) {
  modal.querySelector('.modal-img').src = user.image;
  modal.querySelector('.modal-name').textContent = user.name;
  modal.querySelector('.modal-characteristics').textContent = `Características: ${user.characteristics}`;
  modal.querySelector('.modal-food').textContent = `Comida favorita: ${user.food}`;
  modal.classList.add('show');
}

modal.querySelector('.close-btn').onclick = () => {
  modal.classList.remove('show');
};

async function loadUsers() {
  const res = await fetch('src/memories/memories.json');
  users = await res.json();
  showCard(currentIndex);
}

function showCard(index) {
  cardContainer.innerHTML = '';
  if (index >= users.length) {
    cardContainer.innerHTML = '<h2>No more profiles!</h2>';
    return;
  }

  const user = users[index];
  const card = document.createElement('div');
  card.classList.add('user-card');

  const img = document.createElement('img');
  img.src = user.image;
  img.alt = user.name;

  const name = document.createElement('h2');
  name.textContent = user.name;

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
  card.appendChild(actions);
  cardContainer.appendChild(card);

  likeBtn.onclick = () => swipeCard(card, 'right');
  dislikeBtn.onclick = () => swipeCard(card, 'left');
  infoBtn.onclick = () => showModal(user);

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
  card.style.transition = 'transform 0.5s';
  card.style.transform = direction === 'right'
    ? 'translateX(500px) rotate(30deg)'
    : 'translateX(-500px) rotate(-30deg)';
  setTimeout(() => {
    currentIndex++;
    showCard(currentIndex);
  }, 350);
}

loadUsers();