const users = [
  {
    id: 1,
    name: 'John Doe',
    image: 'src/assets/images/foto1.jpeg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'src/assets/images/foto1.jpeg',
  },
  // Add more user profiles as needed
];

const cardContainer = document.querySelector('.card-container');
let currentIndex = 0;

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

  actions.appendChild(dislikeBtn);
  actions.appendChild(likeBtn);

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(actions);
  cardContainer.appendChild(card);

  // Button actions
  likeBtn.onclick = () => swipeCard(card, 'right');
  dislikeBtn.onclick = () => swipeCard(card, 'left');

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

showCard(currentIndex);