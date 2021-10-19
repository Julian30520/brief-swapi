const API_URL = "https://swapi.dev/api/people/?page=";
const CONTAINER = document.getElementById('container');
const BUTTON_NEXT = document.getElementById('button-next');
const BUTTON_BACK = document.getElementById('button-back');

let pageIndex = 1;

BUTTON_NEXT.addEventListener('click', () => {
    pageIndex++;
    resetThumbnail();
    createThumbnail();
});

BUTTON_BACK.addEventListener('click', () => {
    pageIndex--;
    resetThumbnail();
    createThumbnail();
});

async function getData(id) {
    try {
        const response = await fetch(API_URL + pageIndex);
        const responseFormat = await response.json();
        console.log(responseFormat);

        const NAME = document.getElementById('name'+id);
        const HEIGHT = document.getElementById('height'+id);
        const MASS = document.getElementById('mass'+id);
        const DATE = document.getElementById('date'+id);
        const GENDER = document.getElementById('gender'+id);
        const HOMEWORLD = document.getElementById('homeworld'+id);

        NAME.innerText = responseFormat.results[id].name;
        HEIGHT.innerText = responseFormat.results[id].height + "cm";
        MASS.innerText = responseFormat.results[id].mass + "kg";
        DATE.innerText = responseFormat.results[id].birth_year;
        GENDER.innerText = responseFormat.results[id].gender;

        const responsePlanet = await fetch(responseFormat.results[id].homeworld);    
        const responseFormatPlanet = await responsePlanet.json();
        HOMEWORLD.innerText =  responseFormatPlanet.name;
    }
    catch(err) {
        console.error(err);
    }
}

function createThumbnail() {
    for(let index = 0; index < 10; index++) {
        CONTAINER.innerHTML += 
    `
    <div class="thumbnail">
        <p id="name${index}">name : </p>
        <p id="height${index}">height : </p>
        <p id="mass${index}">mass : </p>
        <p id="date${index}">naissance : </p>
        <p id="gender${index}">sexe : </p>
        
        <p id="homeworld${index}">monde : </p>
    </div>
    `;

    getData(index);
    }
}

function resetThumbnail() {
    CONTAINER.innerHTML = "";
}

createThumbnail();