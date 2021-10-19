const API_URL = `https://swapi.dev/api/films/`;
const RESP = document.getElementById('resp');
const FILMTITLE = document.getElementById('filmtitle');
const FILMEPISODE = document.getElementById('filmepisode');
const FILMOPENING = document.getElementById('filmopening');
const FILMDIRECTOR = document.getElementById('filmdirector');



fetch(API_URL).then(resp => {
    return resp.json()
}).then(dataFilms => {




    console.log(dataFilms.results[5])
    FILMTITLE.innerText = dataFilms.results[5].title;

    FILMEPISODE.innerText = dataFilms.results[5].episode_id;
    FILMOPENING.innerText = dataFilms.results[5].opening_crawl;
    FILMDIRECTOR.innerText = dataFilms.results[5].director;



}
)


        //<div>
        //     
        //     <div>
        //         <h6>Title</h6>
        //         <span>episode_id</span>
        //         <span>opening_crawl</span>
        //         <span>director</span>
        //         <span>producer</span>
        //         <span>release_date</span>
        //         <span>characters</span>
        //     </div>
        // </div>
        // <img src="assets/imagesFilm/film1 (1).jpg" alt="film1">



