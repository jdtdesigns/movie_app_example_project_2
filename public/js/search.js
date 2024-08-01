const searchForm = document.querySelector('#search-form');
const resultsOutput = document.querySelector('.results');

function outputMovies(movieData) {
  resultsOutput.innerHTML = '';

  movieData.forEach(movieObj => {
    resultsOutput.insertAdjacentHTML('beforeend', `
      <div class="result">
        <h3>${movieObj.Title}</h3>
        <p>Release: ${movieObj.Year}</p>
        ${movieObj.favorited ? '<button disabled>Favorited</button>' : `<button data-imdbID="${movieObj.imdbID}">Add To Favorites</button>`}
      </div>
    `);
  })
}

async function getMovies(e) {
  e.preventDefault();

  const searchInput = document.querySelector('#search-input');

  const res = await fetch(`/api/search?movie=${searchInput.value}`);
  const data = await res.json();

  searchInput.value = '';

  outputMovies(data);
}

async function addFavorite(button) {
  const imdbID = button.dataset.imdbid;

  await fetch('/api/favorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      imdbID: imdbID
    })
  });

  button.innerText = 'Favorited';
  button.disabled = true;


}

searchForm.addEventListener('submit', getMovies);

resultsOutput.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    addFavorite(e.target);
  }
})