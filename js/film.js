const API_URL = `https://swapi.dev/api/films/`;




const CONTAINER = document.getElementById("container");




//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-


// ecouteur dévenement de conteneur clikable
for (let index = 0; index < 6; index++) {
    CONTAINER.innerHTML += `
    <div style="cursor: pointer;" class="thumbnail">
        <img id="imgF${index + 1}" src="images/imagesFilm/film${index + 1}.jpg" alt="">
        <p id="title${index}"></p>
        <p id="episode_id${index}"></p>
        <p id="opening_crawl${index}"></p>
        <p id="director${index}"></p>
        <p id="producer${index}"></p>
        <p id="release_date${index}"></p>
        <button class="inactive" id="btnP${index}">Personnages</button>
        <p id="characters${index}"></p> 
    </div>`
}



const IMGF1 = document.getElementById("imgF1");
IMGF1.addEventListener('click', function (event) {
    console.log('ok');
    getData("https://swapi.dev/api/films/4/", 0, false);
    document.getElementById("btnP0").classList.remove("inactive");
    document.getElementById("btnP0").classList.add("active");
});


const IMGF2 = document.getElementById("imgF2");
IMGF2.addEventListener('click', function (event) {
    console.log('ok');
    getData("https://swapi.dev/api/films/5/", 1, false);
    document.getElementById("btnP1").classList.remove("inactive");
    document.getElementById("btnP1").classList.add("active");
});


const IMGF3 = document.getElementById("imgF3");
IMGF3.addEventListener('click', function (event) {
    console.log('ok');
    getData("https://swapi.dev/api/films/6/", 2, false);
    document.getElementById("btnP2").classList.remove("inactive");
    document.getElementById("btnP2").classList.add("active");
});


const IMGF4 = document.getElementById("imgF4");
IMGF4.addEventListener('click', function (event) {
    console.log('ok');
    getData("https://swapi.dev/api/films/1/", 3, false);
    document.getElementById("btnP3").classList.remove("inactive");
    document.getElementById("btnP3").classList.add("active");
});


const IMGF5 = document.getElementById("imgF5");
IMGF5.addEventListener('click', function (event) {
    console.log('ok');
    getData("https://swapi.dev/api/films/2/", 4, false);
    document.getElementById("btnP4").classList.remove("inactive");
    document.getElementById("btnP4").classList.add("active");
});


const IMGF6 = document.getElementById("imgF6");
IMGF6.addEventListener('click', function (event) {
    console.log('ok');
    getData("https://swapi.dev/api/films/3/", 5, false);
    document.getElementById("btnP5").classList.remove("inactive");
    document.getElementById("btnP5").classList.add("active");
});

const buttonElement0 = document.getElementById('btnP0');
buttonElement0.addEventListener('click', function (event) {
    getData("https://swapi.dev/api/films/4/", 0, true);
});

const buttonElement1 = document.getElementById('btnP1');
buttonElement1.addEventListener('click', function (event) {
    getData("https://swapi.dev/api/films/5/", 1, true);
});

const buttonElement2 = document.getElementById('btnP2');
buttonElement2.addEventListener('click', function (event) {
    getData("https://swapi.dev/api/films/6/", 2, true);
});

const buttonElement3 = document.getElementById('btnP3');
buttonElement3.addEventListener('click', function (event) {
    getData("https://swapi.dev/api/films/1/", 3, true);
});

const buttonElement4 = document.getElementById('btnP4');
buttonElement4.addEventListener('click', function (event) {
    getData("https://swapi.dev/api/films/2/", 4, true);
});

const buttonElement5 = document.getElementById('btnP5');
buttonElement5.addEventListener('click', function (event) {
    getData("https://swapi.dev/api/films/3/", 5, true);
});

// exemple pour un bouton

// const buttonElement = document.getElementById('btn');
// buttonElement.addEventListener('click', function (event) {
//     getData();
// });


//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-


//function pour l'appel de l'API et boucle pour faire les 6 vignettes de films

function getData(api, id, people) {
    fetch(api).then(resp => {
        return resp.json()
    }).then(dataFilms => {


        switch (id) {
            case 0:
                IMGF1.src = "";
                break;

            case 1:
                IMGF2.src = "";
                break;

            case 2:
                IMGF3.src = "";
                break;

            case 3:
                IMGF4.src = "";
                break;

            case 4:
                IMGF5.src = "";
                break;

            case 5:
                IMGF6.src = "";
                break;

            default:
                break;
        }
        const TITLE = document.getElementById("title" + id);
        const EPISODE_ID = document.getElementById("episode_id" + id);
        //const OPENING_CRAWL = document.getElementById("opening_crawl" + id);
        const DIRECTOR = document.getElementById("director" + id);
        const PRODUCER = document.getElementById("producer" + id);
        const RELEASE_DATE = document.getElementById("release_date" + id);



        TITLE.innerText = dataFilms.title;
        EPISODE_ID.innerText = dataFilms.episode_id;
        // OPENING_CRAWL.innerText = dataFilms.opening_crawl;
        DIRECTOR.innerText = dataFilms.director;
        PRODUCER.innerText = dataFilms.producer;
        RELEASE_DATE.innerText = dataFilms.release_date;
        //CHARACTERS.innerText = dataFilms.characters;



        if (people) {
            const list_url = dataFilms.characters;
            Promise.all(list_url.map(x => fetch(x))).then((resp) => {
                return Promise.all(resp.map(x => x.json()));
            })
                .then(data => {
                    const CHARACTERS = document.getElementById("characters" + id);
                    for (let index = 0; index < data.length; index++) {
                        CHARACTERS.innerText += data[index].name + "\n";
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }

    })


};


//liste des films : leur différentes données de base + nom des vaisseaux apparraissant + les espèces
//                         ok                                 non                          non