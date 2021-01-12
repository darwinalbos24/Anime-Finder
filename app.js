// Materialize behavior
$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
    });

// Function searchAnime
function searchAnime(e) {

    e.preventDefault();

    const form = new FormData(this);
    const query = form.get('search');

    fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&page=1`)
    .then(response => response.json())
    .then(displayResults)
    .catch(error => console.warn(error.message));
}

// Function displayResults
function displayResults(data) {

    const searchResults = document.getElementById('search-results');

    searchResults.innerHTML = data.results
    .map(anime => {
        return `
            <div class="card">
                <div class="card-image">
                    <img src="${anime.image_url}">
                </div>

                <div class="card-content">
                    <span class="card-title"><b>● ${anime.title}</b> (${anime.rated})</span>
                    <h6>${anime.synopsis}</h6>
                    <p>Number of episode(s): ${anime.episodes}</p>
                    <p>Anime Score: ${anime.score}</p><br>
                    <a id="redirect" href="https://animepahe.com" class="button btn-large">Watch this Anime</a>
                </div>
            </div>`
    }).join("");
}

// Function loadPage
function loadPage() {
    const form = document.getElementById('search_form');
    form.addEventListener('submit', searchAnime);
}


// DOM Loaded Content
window.addEventListener('load', loadPage)