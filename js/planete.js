const API_URL = "https://swapi.dev/api/planets/?page=";
const CONTAINER = document.getElementById("container");
const BUTTON_NEXT = document.getElementById("button-next");
const BUTTON_BACK = document.getElementById("button-back");

let listeButtonResident = [];

let listeButtonFilm = [];

let pageIndex = 1;


function setButton(){

    for (let index = 0; index < 10; index++) {
        const buttonResident = new Object();
        buttonResident.ref=document.getElementById(`residents${index}`);

        const buttonMovie = new Object();
        buttonMovie.ref=document.getElementById(`movies${index}`);

        listeButtonResident.push(buttonResident);
        listeButtonFilm.push(buttonMovie);
        
    }

    for (let index = 0; index < 10; index++) {
        listeButtonResident[index].ref.addEventListener('click', () => {
            getData(index,true,false);
          });

          listeButtonFilm[index].ref.addEventListener('click', () => {
            getData(index,false,true);
          });

        
        
        
    }
}



BUTTON_NEXT.addEventListener("click", () => {
  pageIndex++;
  resetThumbnail();
  createThumbnail();
});

BUTTON_BACK.addEventListener("click", () => {
  pageIndex--;
  resetThumbnail();
  createThumbnail();
});

async function getData(id, resident, movies) {
  try {
    const response = await fetch(API_URL + pageIndex);
    const responseFormat = await response.json();
    // console.log(responseFormat);

    const NAME = document.getElementById("nom" + id);
    const DIAMETER = document.getElementById("diametre" + id);
    const CLIMATE = document.getElementById("climat" + id);
    const GRAVITY = document.getElementById("gravity" + id);
    const TERRAIN = document.getElementById("terrain" + id);
    const POPULATION = document.getElementById("pop" + id);
    const RESIDENT = document.getElementById("residents" + id);
    const MOVIES = document.getElementById("movies"+ id)

    NAME.innerText = responseFormat.results[id].name;
    DIAMETER.innerText = responseFormat.results[id].diameter;
    CLIMATE.innerText = responseFormat.results[id].climate;
    GRAVITY.innerText = responseFormat.results[id].gravity;
    TERRAIN.innerText = responseFormat.results[id].terrain;
    POPULATION.innerText = responseFormat.results[id].population;

    if(resident) {
        const listResidentURL = responseFormat.results[id].residents;
        const responseResident = await Promise.all(listResidentURL.map(x => fetch(x)));
        const responseFormatResident = await Promise.all(responseResident.map(x => x.json()));
        console.log(responseFormatResident);
        for(let index = 0; index < responseFormatResident.length; index++) {
            RESIDENT.innerText += responseFormatResident[index].name + "\n";
        }
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
} catch (err) {
    console.error(err);
  }
}



function createThumbnail() {
  for (let index = 0; index < 8; index++) {
    CONTAINER.innerHTML += `
            <div class="thumbnail">
            <P id="nom${index}">Name : </P>
            <P id="diametre${index}">Diametre : </P>
            <P id="climat${index}">Climat : </P>
            <P id="gravity${index}">Gravity : </P>
            <P id="terrain${index}">Terrain : </P>
            <P id="pop${index}">Population : </P>
            <button id="residents${index}" value="">residents : <br></button>
            <button id="movies${index}"> Movies : <br> </button>
    </div>
        `;

    getData(index,false,false);
  }

  setButton();
}


function resetThumbnail() {
  CONTAINER.innerHTML = "";
    listeButtonResident = [];
    listeButtonFilm = [];
  
}

createThumbnail();