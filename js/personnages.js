const API_URL = "https://swapi.dev/api/people/?page=";
const CONTAINER = document.getElementById('container');
const BUTTON_NEXT = document.getElementById('button-next');
const BUTTON_BACK = document.getElementById('button-back');
const BUTTON_SEARCH = document.getElementById('buttonData');
const INPUT_FIELD = document.getElementById('inputField');

let listButtonWorld = [];
let listButtonMovie = [];
let pageIndex = 1;

BUTTON_SEARCH.addEventListener('click', () => {
    search();
})

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

async function getData(id, homeWorld, movies) {
    try {
        const response = await fetch(API_URL + pageIndex);
        const responseFormat = await response.json();
        //console.log(responseFormat);

        const NAME = document.getElementById('name'+id);
        const HEIGHT = document.getElementById('height'+id);
        const MASS = document.getElementById('mass'+id);
        const DATE = document.getElementById('date'+id);
        const GENDER = document.getElementById('gender'+id);
        const HOMEWORLD = document.getElementById('homeworld'+id);
        const MOVIES = document.getElementById('movies'+id);

        NAME.innerText = responseFormat.results[id].name;
        HEIGHT.innerText = responseFormat.results[id].height + "cm";
        MASS.innerText = responseFormat.results[id].mass + "kg";
        DATE.innerText = responseFormat.results[id].birth_year;
        GENDER.innerText = responseFormat.results[id].gender;

        if(homeWorld) {
            const responsePlanet = await fetch(responseFormat.results[id].homeworld);    
            const responseFormatPlanet = await responsePlanet.json();
            HOMEWORLD.innerText =  responseFormatPlanet.name;
        }

        if(movies) {
            const listMoviesURL = responseFormat.results[id].films;
            const responseMovie = await Promise.all(listMoviesURL.map(x => fetch(x)));
            const responseFormatMovie = await Promise.all(responseMovie.map(x => x.json()));
            console.log(responseFormatMovie);
            for(let index = 0; index < responseFormatMovie.length; index++) {
                MOVIES.innerText += responseFormatMovie[index].title + "\n";
            }
        }
    }
    catch(err) {
        console.error(err);
    }
}

function createThumbnail() {
    for(let index = 0; index < 10; index++) {
        CONTAINER.innerHTML += 
    `
    <div class="thumbnail" id="thumbnail${index}">
        <p id="name${index}">name : </p>
        <p id="height${index}">height : </p>
        <p id="mass${index}">mass : </p>
        <p id="date${index}">naissance : </p>
        <p id="gender${index}">sexe : </p>
        <button id="button-world${index}">Monde</button>
        <p id="homeworld${index}"></p>
        <button id="button-movies${index}">Movies</button>
        <p id="movies${index}"></p>
    </div>
    `;

    getData(index, false, false);
    }

    setButtons();
}

function resetThumbnail() {
    CONTAINER.innerHTML = "";
    listButtonWorld = [];
    listButtonMovie = [];
}

function setButtons() {
    for(let index = 0; index < 10; index++) {
        const buttonWorld = new Object();
        buttonWorld.ref = document.getElementById(`button-world${index}`);

        const buttonMovie = new Object();
        buttonMovie.ref = document.getElementById(`button-movies${index}`);

        listButtonWorld.push(buttonWorld);
        listButtonMovie.push(buttonMovie);
    }

    for(let index = 0; index < 10; index++) {
        listButtonWorld[index].ref.addEventListener('click', () => {
            getData(index, true, false);
        });
        listButtonMovie[index].ref.addEventListener('click', () => {
            getData(index, false, true);
        });
    }
}

function search() {
    
}

createThumbnail();
