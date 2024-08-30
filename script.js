const API_URL = " https://pokeapi.co/api/v2/pokemon/";
const card = document.querySelector(".card");
const button = document.querySelector(".btn");

//colors for different types of pokemon:
const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

let getPokeData = () => {
  //generate a random number between 1 and 150
  let id = Math.floor(Math.random() * 150) + 1;

  //combine the random poke id into the url to get data for that pokemon
  const finalURL = API_URL + id;

  //fetch the newly created url:
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => generateCard(data));
};

//generating a card using fetched data
let generateCard = (data) => {
  console.log(data);
  const hp = data.stats[0].base_stat;
  const pokeImage = data.sprites.other.dream_world.front_default;
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const attack = data.stats[1].base_stat;
  const defense = data.stats[2].base_stat;
  const speed = data.stats[5].base_stat;

  //setting theme color based on pokemon type
  const themeColor = typeColor[data.types[0].type.name];

  card.innerHTML = `
        <p class="hp">
            <span>hp </span>${hp}
        </p>
        <img src=${pokeImage} alt="">
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types">
            
            </div>
            <div class="stats">
                <div>
                    <h3>${attack}</h3>
                    <p>Attack</p>
                </div>
                <div>
                    <h3>${defense}</h3>
                    <p>Defense</p>
                </div>
                <div>
                    <h3>${speed}</h3>
                    <p>Speed</p>
                </div>
            </div>`;
  appendTypes(data.types);
  styleCard(themeColor);
};

let appendTypes = (types) => {
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);
  });
};

let styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });
};

button.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
