const API_URL = "https://swapi.dev/api/vehicles/?page=";
const CONTAINER = document.getElementById('container');
const BUTTON_NEXT = document.getElementById('button-next');
const BUTTON_BACK = document.getElementById('button-back');


let listeButtonFilm = [];


let pageIndex = 1;

function setButton(){

  for (let index = 0; index < 10 ; index++) {
    const buttonMovies = new Object();
    buttonMovies.ref=document.getElementById(`button-movies${index}`);
    
    listeButtonFilm.push(buttonMovies);
  }

  for (let index = 0; index < 10; index++) {
    listeButtonFilm[index].ref.addEventListener('click', () => {
      getData(index, true);
    });
    
  }
}

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

async function getData(id, movies) {
    try {
        const response = await fetch(API_URL + pageIndex);
        const responseFormat = await response.json();
       // console.log(responseFormat);

        const NAME = document.getElementById("name"+id);
        const MODEL = document.getElementById("model"+id);
        const MANUFACTERER = document.getElementById("manufacturer"+id);
        const COST = document.getElementById("cost"+id);
        const LENGTH = document.getElementById("length"+id);
        const MOVIES = document.getElementById('movies'+id);
    

        NAME.innerText = responseFormat.results[id].name;
        MODEL.innerText = responseFormat.results[id].model;
        MANUFACTERER.innerText = responseFormat.results[id].manufacturer;
        COST.innerText = responseFormat.results[id].cost_in_credits;
        LENGTH.innerText = responseFormat.results[id].length;
      

              
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
          <div class="thumbnail">
            <H3 id="name${index}">name : </H3>
            <p id="model${index}">model : </p>
            <p id="manufacturer${index}">manufacturer : </p>
            <p id="cost${index}">cost : </p>
            <p id="length${index}">length : </p>
            <button id="button-movies${index}">FILMS</button>
            <p id="movies${index}"></p>
          </div>
          `;

    getData(index, false);
    }

    setButton();
}

function resetThumbnail() {
    CONTAINER.innerHTML = "";
    listeButtonFilm = [];
}

createThumbnail();







/*// const NAME_VEHICLE = document.getElementById("name_vehicle");
// const MODEL_VEHICLE = document.getElementById("model_vehicle");
// const MANUFACTERER_VEHICLE = document.getElementById("manufacturer_vehicle");
// const COST_VEHICLE = document.getElementById("cost_vehicle");
// const LENGTH_VEHICLE = document.getElementById("length_vehicle");
// const SPEED_VEHICLE = document.getElementById("max_atmosphering_speed");
// const PASSENGERS_VEHICLE = document.getElementById("passengers");
// const CREW_VEHICLE = document.getElementById("crew");
// const CAPACITY_VEHICLE = document.getElementById("cargo_capacity");
// const CONSUMABLE_VEHICLE= document.getElementById("consumables");
// const CLASS_VEHICLE = document.getElementById("vehicle_class");


const CONTAINER = document.getElementById("container");
const API_URL = "https://swapi.dev/api/vehicles/";
const BUTTON_SUIVANT = document.getElementById("next_button")
const BUTTON_INFORMATIONS = document.getElementById("extend_button");
const BUTTON_NEXT = document.getElementById('button-next');
const BUTTON_BACK = document.getElementById('button-back');

fetch(API_URL).then(resp => {
    return resp.json()
}).then(dataVehicules => {


  for (let index = 0; index < dataVehicules.results.length; index++) {

    let VEHICULES = dataVehicules.results[index];
    console.log(VEHICULES);

    CONTAINER.innerHTML += `
    <div class="thumbnail">
          <h3 id="name_vehicle${index}">${VEHICULES.name}</h3>
          <button class = "button_page" id="extend_button"> Informations ... </button>
          <p id ="model_vehicle${index}"> Modèle : ${VEHICULES.model}</p>
          <p id="manufacturer_vehicle${index}">Constructeur : ${VEHICULES.manufacturer}</p>
          <p id="cost_vehicle${index}"> Coût : ${VEHICULES.cost_in_credits} credits</p>
          <p id ="length_vehicle${index}">Longueur : ${VEHICULES.length} mètres</p>
          <p id ="max_atmosphering_speed${index}">Vitesse max : ${VEHICULES.cargo_capacity} km/h</p>
          <p id ="crew"${index}> Equipage : ${VEHICULES.vehicle_class}</p>
      </div>
    `
    }   
    
    
  })

  function resetThumbnail() {
    CONTAINER.innerHTML = "";
}

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


 

  
  
  
    // VEHICLES = dataVehicules[`vehicles/${index}`];
    
    // LIST_VEHICLE.innerHTML += `
    // <div>
    //     <p> Nom : ${VEHICLES.name}</p>
    //     </div>
    
    
    



  
  // PROCHAIN_JOUR.innerHTML += `
    // <div>
    //     <p>Jour : ${PREVISION.day_long}</p>
    //     <p>Température max : ${PREVISION.tmax}</p>
    //     <p>Température min : ${PREVISION.tmin}</p>
    //     <p>Prévision : ${PREVISION.condition}</p>
    //     <img src="${PREVISION.icon}" alt="">
    // </div>
    // `
    
    
    
    
    
    
    // NOM.innerText = dataVehicules.results[5].name;
    // MODEL_VEHICLE.innerText = dataVehicules.results[5].model;
    // MANUFACTERER_VEHICLE.innerText = dataVehicules.results[5].manufacturer;
    
    
    // for (let index = 0; index < dataVehicules.results.length; index++) {
      
      //    const VEHICLE = dataVehicules.results[index];
      
      
      //   LIST_VEHICLES.innerHTML += `
        
      // <div>
      //   <p>Nom : ${VEHICLE.name}</p>
      //   <p>Modèle : ${VEHICLE.model}</p>
      //   <p>Manufacture : ${VEHICLE.manufacturer}</p>
      //   <p>Cout : ${VEHICLE.cost_in_credits} crédits</p>
      //   <p>Longueur : ${VEHICLE.length} mètres</p>
      
      // </div>
      
      
      //   `
      
      //          const VEHICLE = dataVehicules.results[index]   
      
      //         console.log(dataVehicules.results[index]);
      
      
      
      // }
      
      // MODEL_VEHICLE.innerText = dataVehicules.results[index].model;
      // MANUFACTERER_VEHICLE.innerText = dataVehicules.results[index].manufacturer;
      // COST_VEHICLE.innerText = dataVehicules.results[index].cost_in_credits;
      // LENGTH_VEHICLE.innerText = dataVehicules.results[index].length;
      // SPEED_VEHICLE.innerText = dataVehicules.results[index].max_atmosphering_speed;
      // PASSENGERS_VEHICLE.innerText = dataVehicules.results[index].passengers;
      // CREW_VEHICLE.innerText = dataVehicules.results[index].crew;
      // CAPACITY_VEHICLE.innerText = dataVehicules.results[index].cargo_capacity;
      // CONSUMABLE_VEHICLE.innerText = dataVehicules.results[index].consumables;
      // CLASS_VEHICLE.innerText = dataVehicules.results[index].vehicle_class;
        
      //   // }*/