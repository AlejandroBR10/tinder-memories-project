const users = [
  {
    id: 1,
    name: 'John Doe',
    image: 'assets/images/user1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'assets/images/user2.jpg',
  },
  // Add more user profiles as needed
];

const cardContainer = document.querySelector('.card-container');

users.forEach(user => {
  const card = document.createElement('div');
  card.classList.add('card');
  
  const img = document.createElement('img');
  img.src = user.image;
  img.alt = user.name;
  
  const name = document.createElement('h3');
  name.textContent = user.name;
  
  card.appendChild(img);
  card.appendChild(name);
  cardContainer.appendChild(card);
});

// Add swipe functionality
let startX;

cardContainer.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

cardContainer.addEventListener('touchmove', (e) => {
  const moveX = e.touches[0].clientX;
  const diffX = moveX - startX;

  if (diffX > 50) {
    // Swipe right
    console.log('Liked:', users[0].name);
  } else if (diffX < -50) {
    // Swipe left
    console.log('Disliked:', users[0].name);
  }
});