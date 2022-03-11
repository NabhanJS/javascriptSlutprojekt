let characterList;
let page = 1;
fetchList();
renderPageNumber();
async function fetchList() {
  try {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        characterList = data.results;
        renderList();
      });
  } catch (error) {
    console.log(error);
  }
}

function renderList() {
  const spinnerFirstCard = document.querySelector(".first-card .spinner");
  spinnerFirstCard.style.display = "none";
  let caracterId = 1;
  let listItems = "";
  for (let info of characterList) {
    listItems += `<h1 id="caracterPosition${caracterId++}">${info.name}</h1>`;
  }

  document.querySelector("div, .caracterListPositions").innerHTML = listItems;
  renderPageNumber();
  characterListener();
}

function renderPageNumber() {
  document.querySelector(".page").innerHTML = page + " " + "/" + " " + "9";
}

function characterListener() {
  document
    .querySelectorAll("h1")
    .forEach((h1) => h1.addEventListener("click", findCharacter));
}

function findCharacter(chosenCharacter) {
  const selectedCharacter = characterList.find(
    (info) => info.name === chosenCharacter.target.innerText
  );
  renderCharacterInfo(selectedCharacter);
  renderPlanetInfo(selectedCharacter);
}

async function renderCharacterInfo(info) {
  const spinnerSecondCardTop = document.querySelector(".top-info .spinner");
  spinnerSecondCardTop.style.display = "flex";
  try {
    const information = `<article>
  <h1>${info.name}</h1>
  <p>Height: ${info.height}</p>
  <p>Mass: ${info.mass}</p>
  <p>Hair color: ${info.hair_color}</p>
  <p>Skin color: ${info.skin_color}</p>
  <p>Eye color: ${info.eye_color}</p>
  <p>Birth year: ${info.birth_year}</p>
  <p>Gender: ${info.gender}</p>
  </article>`;
    document.querySelector(".top-info .characterDetails").innerHTML = information;
    const spinnerSecondCardTop = document.querySelector(".top-info .spinner");
    spinnerSecondCardTop.style.display = "none";
  } catch (error) {
    console.log(error);
  }
}

async function renderPlanetInfo(info) {
  const spinnerSecondCardBottom = document.querySelector(
    ".bottom-info .spinner"
  );
  spinnerSecondCardBottom.style.display = "flex";
  try {
    const response = await fetch(info.homeworld);
    const test = await response.json();

    let homePlanet = `
    <h1>${test.name}</h1>
    <p>Rotation period: ${test.rotation_period}</p> 
    <p>Orbital period: ${test.orbital_period}</p>
    <p>Diameter: ${test.diameter}</p>
    <p>Climate: ${test.climate}</p>
    <p>Gravity: ${test.gravity}</p>
    <p>Terrain: ${test.terrain}</p>
    `;
    document.querySelector(".bottom-info .planetDetails").innerHTML = homePlanet;
    const spinnerSecondCardBottom = document.querySelector(".bottom-info .spinner");
    spinnerSecondCardBottom.style.display = "none";
  } catch (error) {
    console.log(error);
  }
}

document.querySelector("#back-triangle").addEventListener("click", () => {
  if (page > 1) {
    page--;
  }
  const spinnerFirstCardd = document.querySelector(".first-card .spinner");
  spinnerFirstCardd.style.display = "flex";
  fetchList();
});

document.querySelector("#forward-triangle").addEventListener("click", () => {
  if (page < 9) {
    page++;
  }
  const spinnerFirstCarddd = document.querySelector(".first-card .spinner");
  spinnerFirstCarddd.style.display = "flex";
  fetchList();
});
