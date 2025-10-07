let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const favContainer = document.querySelector('.card-container');

function renderFavorites() {
  favContainer.innerHTML = '';
  if (favorites.length === 0) {
    favContainer.innerHTML = '<h2>No hay favoritos aún.</h2>';
    return;
  }

  favorites.forEach((fav) => {
    const card = document.createElement('div');
    card.classList.add('user-card');

    const img = document.createElement('img');
    img.src = fav.imagen;
    img.alt = fav.nombre;

    const name = document.createElement('h2');
    name.textContent = fav.nombre;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'action-btn dislike';
    removeBtn.innerHTML = '✖';
    removeBtn.onclick = () => {
      removeFavorite(fav.id); // Eliminar de favoritos
    };

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(removeBtn);
    favContainer.appendChild(card);
  });
}

function removeFavorite(id) {
  favorites = favorites.filter((fav) => fav.id !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites(); // Volver a renderizar los favoritos
}

document.addEventListener('DOMContentLoaded', renderFavorites);