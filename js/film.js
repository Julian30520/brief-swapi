const API_URL = `https://swapi.dev/api/films/`;




const CONTAINER = document.getElementById("container");

//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-


// ecouteur dévenement de conteneur clikable
for (let index = 0; index < 6; index++) {
    CONTAINER.innerHTML += `
    <div style="cursor: pointer;" class="thumbnail">
        <img id="imgF${index + 1}" src="images/imagesFilm/film${index + 1}.jpg" alt="film1">
        <p id="title${index}"></p>
        <p id="episode_id${index}"></p>
        <p id="opening_crawl${index}"></p>
        <p id="director${index}"></p>
        <p id="producer${index}"></p>
        <p id="release_date${index}"></p>
        <p id="characters${index}"></p> 
    </div>`
}


const IMGF1 = document.getElementById("imgF1");
IMGF1.addEventListener('click', function (event) {
    console.log('ok');
    getData("https://swapi.dev/api/films/4/", 0);
});


const IMGF2 = document.getElementById("imgF2");
IMGF2.addEventListener('click', function (event) {
    console.log('ok');
    getData("https://swapi.dev/api/films/5/", 1);
});


const IMGF3 = document.getElementById("imgF3");
IMGF3.addEventListener('click', function (event) {
    console.log('ok');
    getData("https://swapi.dev/api/films/6/", 2);
});


const IMGF4 = document.getElementById("imgF4");
IMGF4.addEventListener('click', function (event) {
    console.log('ok');
    getData("https://swapi.dev/api/films/1/", 3);
});


const IMGF5 = document.getElementById("imgF5");
IMGF5.addEventListener('click', function (event) {
    console.log('ok');
    getData("https://swapi.dev/api/films/2/", 4);
});


const IMGF6 = document.getElementById("imgF6");
IMGF6.addEventListener('click', function (event) {
    console.log('ok');
    getData("https://swapi.dev/api/films/3/", 5);
});

// exemple pour un bouton

// const buttonElement = document.getElementById('btn');
// buttonElement.addEventListener('click', function (event) {
//     getData();
// });


//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-


//function pour l'appel de l'API et boucle pour faire les 6 vignettes de films

function getData(api, id) {
    fetch(api).then(resp => {
        return resp.json()
    }).then(dataFilms => {

        IMGF1.src = "";
        const TITLE = document.getElementById("title" + id);
        const EPISODE_ID = document.getElementById("episode_id" + id);
        //const OPENING_CRAWL = document.getElementById("opening_crawl" + id);
        const DIRECTOR = document.getElementById("director" + id);
        const PRODUCER = document.getElementById("producer" + id);
        const RELEASE_DATE = document.getElementById("release_date" + id);
        const CHARACTERS = document.getElementById("characters" + id);


        TITLE.innerText = dataFilms.title;
        EPISODE_ID.innerText = dataFilms.episode_id;
        // OPENING_CRAWL.innerText = dataFilms.opening_crawl;
        DIRECTOR.innerText = dataFilms.director;
        PRODUCER.innerText = dataFilms.producer;
        RELEASE_DATE.innerText = dataFilms.release_date;
        CHARACTERS.innerText = dataFilms.characters;
        const list_url = dataFilms.characters;

        return Promise.all(list_url.map(x => fetch(x)));
    })
        .then((resp) => {
            return Promise.all(resp.map(x => x.json()));
        })
        .then(data => {

            console.log(data);
        })

        .catch(err => {
            console.error(err);
        });
};


//liste des films : leur différentes données de base + nom des vaisseaux apparraissant + les espèces
//                         ok                                 non                          non