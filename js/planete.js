// const NAME = document.getElementById('nom');
// const DIAMETER = document.getElementById('diametre');
// const CLIMATE = document.getElementById('climat');
// const GRAVITY = document.getElementById('gravity');
// const TERRAIN = document.getElementById('terrain');
// const POPULATION = document.getElementById('pop')


const CONTAINER = document.getElementById('container');
const API_URL = "https://swapi.dev/api/planets/";

// const BUTTON_DATA = document.getElementById('buttonData');
// const INPUT_PLANETE = document.getElementById('planete');

const API_URL_PAGE = "https://swapi.dev/api/planets/?page=2";
const BUTTONS = document.getElementById("button_suivant");

// BUTTON_DATA.addEventListener('click', ()=> {
//     console.log(INPUT_PLANETE.value);
//     const NEW_API_URL = `${API_URL}/${INPUT_PLANETE.value}`;
//     getData(NEW_API_URL);
// })

BUTTONS.addEventListener('click',() => {
    console.log(BUTTONS.value);
    const NUMERO_PAGE = BUTTONS.value;
    getData(API_URL_PAGE+NUMERO_PAGE);
  });

const listUser =["coco", "micka", "jose"]


const result = listUser.filter( user => user.includes("o"));

console.log(result);




const getData = (api) => {
    fetch(api).then(resp => {
        return resp.json()
    }).then(dataPlanete => {
        console.log(dataPlanete);
    
        // NAME.innerText = dataPlanete.results[1].name;
        // DIAMETER.innerText = dataPlanete.results[1].diameter;
        // CLIMATE.innerText = dataPlanete.results[1].climate;
        // GRAVITY.innerText = dataPlanete.results[1].gravity;
        // TERRAIN.innerText = dataPlanete.results[1].terrain;
        // POPULATION.innerText = dataPlanete.results[1].population;



        for (let index = 0; index < dataPlanete.results.length; index++) {

            let PLANETE = dataPlanete.results[index];
            console.log(PLANETE);
        
            CONTAINER.innerHTML += `
            <div class="thumbnail">
                <P id="nom ${index}">Name : ${PLANETE.name}</P>
                <P id="diametre${index}">Diametre : ${PLANETE.diameter}</P>
                <P id="climat${index}">Climat : ${PLANETE.climat}</P>
                <P id="gravity${index}">Gravity : ${PLANETE.gravity}</P>
                <P id="terrain${index}">Terrain : ${PLANETE.terrain}</P>
                <P id="pop${index}">Population : ${PLANETE.population}</P>
              </div>`
    
          }
        })
    }
getData(API_URL);
    