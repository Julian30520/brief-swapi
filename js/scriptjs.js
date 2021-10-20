const API_URL = "https://swapi.dev/api/planets/?page=";
const CONTAINER = document.getElementById("container");
const BUTTON_NEXT = document.getElementById("button-next");
const BUTTON_BACK = document.getElementById("button-back");

let listeButtonResident = [];

// let listeButtonFilm = [];

let pageIndex = 1;


function setButton(){

    for (let index = 0; index < 10; index++) {
        const buttonResident = new Object();
        buttonResident.ref=document.getElementById(`residents${index}`);

        listeButtonResident.push(buttonResident);
        
    }

    for (let index = 0; index < 10; index++) {
        listeButtonResident[index].ref.addEventListener('click', () => {
        getData(index,true);

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

async function getData(id, resident) {
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
    // const FILM = document.

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
    // deuxieme requete pour aller chercher résident et film
    // const responsePlanet = await fetch(responseFormat.results[id].residents);
    // const responseFormatResident = await responsePlanet.json();
    // RESIDENT.innerText = responseFormatResident.name;
  } catch (err) {
    console.error(err);
  }
}

// for (let index = 0; index < dataPlanete.results.length; index++) {
//     let PLANETE = dataPlanete.results[index];
//     console.log(PLANETE);
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
            <button id="residents${index}" value=""></button>
    </div>
            </div>`;

    getData(index,false);
  }

  setButton();
}
// const BUTTONS_RESIDENTS = document.querySelectorAll(".residents");
// for (var i = 0; i < BUTTONS_RESIDENTS.length; i++) {
//   let BUTTON = BUTTONS_RESIDENTS[i];
//   BUTTON.addEventListener("click", function () {
//     console.log(BUTTON.nextElementSibling);
//     getResidents(BUTTON.value, BUTTON.nextElementSibling.id);
//   });
// }
// async function getResidents(liste, div) {
//   const url = liste.split(",");
//   console.log(div);
//   document.getElementById(div).innerHTML = "";
//   for (i = 0; i < url.length; i++) {
//     console.log(url[i]);
//     const RESIDENTS = await fetch(url[i]);
//     const RESIDENT = await RESIDENTS.json();
//     //console.log(film);

//     document.getElementById(div).innerHTML += `<h2>${index}</h2>`;
//   }
// }

function resetThumbnail() {
  CONTAINER.innerHTML = "";
}

createThumbnail();

// const listUser = ["coco", "micka", "jose"];

// const result = listUser.filter((user) => user.includes("o"));

// console.log(result);