const URL = "https://www.omdbapi.com/?apikey=73eb1fea&";

let form = document.forms["searchForm"];
let currentSearchText = "";
let currentPage = 1;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = form.elements["searchBar"].value.trim();

  form.elements["searchBar"].value = "";

  if (!text) return;

  await processQuery(text);
});

const input = form.elements["searchBar"];
let searchTimer;

input.addEventListener("input", () => {
  const text = input.value.trim();

  clearTimeout(searchTimer);

  if (!text) return;

  searchTimer = setTimeout(() => {
    processQuery(text);
  }, 1000);
});

async function processQuery(query, page = 1) {
  currentSearchText = query;
  currentPage = page;

  const result = await searchQuery(query, page);

  if (!result || result.Response === "False") {
    console.log(result?.Error || "Something went wrong");
    return;
  }

  displayQuery(result, query);
  displayPagination(result);
}

async function searchQuery(query, page = 1) {
  try {
    const response = await fetch(`${URL}s=${query}&page=${page}`);

    if (!response.ok) {
      console.log(response);
      return response.status;
    }

    return await response.json();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

const filmsDetailsCache = new Map();

async function getFilmDetails(imdbID) {
  if (filmsDetailsCache.has(imdbID)) {
    console.log("From cache");
    return filmsDetailsCache.get(imdbID);
  }

  try {
    const response = await fetch(`${URL}i=${imdbID}&plot=full`);

    if (!response.ok) {
      console.log(response);
      return null;
    }

    const filmDetails = await response.json();

    filmsDetailsCache.set(imdbID, filmDetails);

    console.log("From API");

    return filmDetails;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

function filmPosterCheck(filmPoster) {
  if (filmPoster === "N/A") {
    return "./assets/images/no-poster.png";
  }
  return filmPoster;
}

async function displayQuery(query, searchText) {
  const resultList = query.Search;

  const main = document.querySelector("main");

  const oldTitle = document.querySelector(".search-title");
  const oldSearchInfo = document.querySelector(".search-info");
  const oldFilms = document.querySelector(".films");

  if (oldTitle) oldTitle.remove();
  if (oldSearchInfo) oldSearchInfo.remove();
  if (oldFilms) oldFilms.remove();

  const searchTitle = document.createElement("h2");
  searchTitle.classList.add("search-title");
  searchTitle.textContent = `Search "${searchText}"`;

  const searchInfo = document.createElement("p");
  searchInfo.classList.add("search-info");
  searchInfo.textContent = `${query.totalResults} results found`;

  const filmsContainer = document.createElement("div");
  filmsContainer.classList.add("films");

  for (let film of resultList) {
    const filmItem = document.createElement("div");
    filmItem.classList.add("film");
    filmItem.dataset.id = film.imdbID;

    const filmPoster = document.createElement("img");
    filmPoster.classList.add("film__poster");
    filmPoster.alt = film.Title;
    filmPoster.src = filmPosterCheck(film.Poster);

    filmsContainer.appendChild(filmItem);
    filmItem.appendChild(filmPoster);
  }

  main.appendChild(searchTitle);
  main.appendChild(searchInfo);
  main.appendChild(filmsContainer);

  filmsContainer.addEventListener("click", async (event) => {
    const filmItem = event.target.closest(".film");

    if (!filmItem) return;

    const imdbID = filmItem.dataset.id;

    const filmDetails = await getFilmDetails(imdbID);

    if (!filmDetails) return;

    createFilmModal(filmDetails);
  });
}

function createFilmModal(film) {
  const oldModal = document.querySelector(".modal-overlay");
  if (oldModal) oldModal.remove();

  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");

  function getMetascoreColor(metascore) {
    const score = Number(metascore);

    if (Number.isNaN(score)) return "#777777";
    if (score < 40) return "#F05C68";
    if (score < 70) return "#F2B437";

    return "#19C56B";
  }

  const metascoreColor = getMetascoreColor(film.Metascore);
  const runtime = convertRuntime(film.Runtime);
  const filmPoster = filmPosterCheck(film.Poster);

  modalOverlay.innerHTML = `
    <div class="film-modal">
      <button class="film-modal__close" type="button">×</button>

      <img
        class="film-modal__poster"
        src="${filmPoster}"
        alt="${film.Title}"
      />

      <div class="film-modal__content">
        <h2 class="film-modal__title">${film.Title}</h2>

        <ul class="film-modal__data">
          <li>${film.Year}</li>
          <li>·</li>
          <li>${film.Type}</li>
          <li>·</li>
          <li>${runtime}</li>
          <li>·</li>
          <li>${film.Rated}</li>
          <li>
            <span class="film-modal__score" style="background-color: ${metascoreColor}">${film.Metascore}</span>
            Metascore
          </li>
        </ul>

        <div class="film-modal__rating">
          ⭐ ${film.imdbRating}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  modalOverlay.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-overlay") || event.target.classList.contains("film-modal__close")) {
      modalOverlay.remove();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelector(".modal-overlay")?.remove();
  }
});

function convertRuntime(durationMinutes) {
  durationMinutes = parseInt(durationMinutes);

  let hours = Math.floor(durationMinutes / 60);

  let minutes = durationMinutes - hours * 60;
  minutes += "m";

  if (!hours) {
    return minutes;
  }

  return `${hours}h ${minutes}`;
}

function displayPagination(query) {
  const oldPagination = document.querySelector(".pagination");
  if (oldPagination) oldPagination.remove();

  if (query.Response === "False") return;

  const pageQty = Math.ceil(Number(query.totalResults) / 10);

  const pagination = document.createElement("div");
  pagination.classList.add("pagination");

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.disabled = currentPage === 1;

  const pageInput = document.createElement("input");
  pageInput.type = "number";
  pageInput.classList.add("pagination__input");
  pageInput.value = currentPage;
  pageInput.min = 1;
  pageInput.max = pageQty;

  const pageTotal = document.createElement("span");
  pageTotal.textContent = `/ ${pageQty}`;

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === pageQty;

  prevBtn.addEventListener("click", () => {
    processQuery(currentSearchText, currentPage - 1);
  });

  nextBtn.addEventListener("click", () => {
    processQuery(currentSearchText, currentPage + 1);
  });

  pageInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    const selectedPage = Number(pageInput.value);

    if (selectedPage < 1 || selectedPage > pageQty) {
      pageInput.value = currentPage;
      return;
    }

    processQuery(currentSearchText, selectedPage);
  });

  pagination.append(prevBtn, pageInput, pageTotal, nextBtn);

  document.querySelector("main").appendChild(pagination);
}
