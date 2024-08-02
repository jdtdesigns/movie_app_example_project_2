const favoritesOutput = document.querySelector('.favorites');

async function removeFavorite(button) {
  const favId = button.parentNode.dataset.id;

  button.parentNode.remove();

  await fetch('/api/unfav', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      favId: favId
    })
  });

  if (!favoritesOutput.children.length) {
    favoritesOutput.innerHTML = '<p class="page-header">You have not stored any favorites.</p>';
  }
}

async function setRating(iTag) {
  const favId = iTag.parentNode.parentNode.dataset.id;
  const ratingLevel = iTag.dataset.level;

  // Moved the DOM star update code above the fetch to improve UI speed
  const parentEl = iTag.parentNode;
  parentEl.innerHTML = '';

  for (let i = 1; i <= 5; i++) {
    if (i <= ratingLevel) {
      parentEl.insertAdjacentHTML('beforeend', `<i data-level="${i}" class="fa-solid fa-star"></i>`)
    } else {
      parentEl.insertAdjacentHTML('beforeend', `<i data-level="${i}" class="fa-regular fa-star"></i>`)
    }
  }

  await fetch('/api/rate', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      favId: favId,
      level: ratingLevel
    })
  })
}

if (favoritesOutput) {
  favoritesOutput.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      removeFavorite(e.target);
    }

    if (e.target.tagName === 'I') {
      setRating(e.target);
    }
  })
}