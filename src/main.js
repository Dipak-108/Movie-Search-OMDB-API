// import { foo } from './JS Components/counter.js';

let searchInput = document.getElementById("search");
let searchDiv = document.getElementsByClassName("search_result_div")[0];
let searchResult = document.getElementsByClassName("search_result");
let searchToSeeMovies=document.getElementById("searchToSeeMovies");
let timeout = null;
// foo();

//movieDetail elements
let contentAreaDiv=document.getElementById("content_area");
let moviePoster=document.getElementById("movie_poster");
let movieTitle=document.getElementById("movieTitle");
let releaseDate=document.getElementById("movie_release");
let runTime=document.getElementById("runtime");
let plot=document.getElementById("plot");
let actors=document.getElementById("actors");
let language=document.getElementById("language");
let rating=document.getElementById("imdbRating");


//while typing the movie name in search field
searchInput.addEventListener("keydown", (event) => {
  showResult(event);
});

//makes search div display to block if clicked on search bar
searchInput.addEventListener("click", (event) => {
  if (searchInput.value.length > 1) {
    searchDiv.style.display = "block";
    // showResult(event);
  }
});

// updates search result while pasting with right click mouse
searchInput.addEventListener("paste", (event) => {
  showResult(event);
});

//updates search result when cut with mouse context menu
searchInput.addEventListener("cut", (event) => {
  showResult(event);
});

//makes search div display to none if clicked anywhere except search bar
document.addEventListener("click", (event) => {
  if (event.target !== searchInput) {
    searchDiv.style.display = "none";
  }
});

//event triggers this and handles debouncing and call to getsearch async function
function showResult(event) {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    let value = event.target.value;

    getSearch(value);
    searchDiv.style.display = "block";

    if (event.target.value === "") {
      searchDiv.style.display = "none";
    }
  }, 400);
}

//gets search result through fetch API and displays below search bar
async function getSearch(searchQuery) {
  this.searchQuery = searchQuery;

  if (this.searchQuery.length < 1) {
    return;
  }

  const url = `http://www.omdbapi.com/?s=${this.searchQuery}&apikey=fc1fef96`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const apiData = await response.json();

    if (apiData.Response != "False") {
      searchArray = apiData.Search;
      searchDiv.innerHTML = "";
      searchArray.forEach((element) => {
        let poster = isPosterAvailable(element);

        searchDiv.insertAdjacentHTML(
          "beforeend",
          `
                <div class="search_result" id="${element.imdbID}" ">
                  <div class="search_img_div ">
                    <img src="${poster}" alt="photo not found in server" />
                  </div>
                  <div class="search_detail">
                    <h2>${element.Title}</h2>
                    <p>${element.Year}</p>
                  </div>
                </div>
                  `
        );
      });

      //adding eventlistener to searchResult and delegating event
      searchDiv.addEventListener("click", (event) => {
        const searchResult_div = event.target.closest(".search_result");
        if (searchResult_div) {
          // ShowMoviedetail(searchResult_div.id);
          getMovieDetails(searchResult_div.id);
        }
        else{
          return;
        }
      });
    }
  } catch (error) {
    console.error(error.message);
  }
}

//gets movie details from API after a click on movie through search result
async function getMovieDetails(movieID) {
  this.movieID=movieID
  const url = `http://www.omdbapi.com/?i=${this.movieID}&apikey=fc1fef96&plot=full`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const detail = await response.json();

    if (detail.Response != "False") {
      showMovieDetail(detail)
    }
  }catch(error){
    console.error(error.message)
  }
  
} 

//Shows movie detail in DOM
function showMovieDetail(movieDetailObject){
  contentAreaDiv.style.display="flex"
  searchToSeeMovies.textContent=" "
  moviePoster.src=isPosterAvailable(movieDetailObject);//check if movie poster is available or not
  movieTitle.textContent=movieDetailObject.Title;
  releaseDate.textContent="Release Date: "+movieDetailObject.Released;
  runTime.textContent=movieDetailObject.Runtime;
  plot.textContent="Plot: "+"''"+movieDetailObject.Plot+"''";
  actors.textContent="Actors: "+movieDetailObject.Actors;
  language.textContent="Language: "+movieDetailObject.Language;
  rating.textContent=movieDetailObject.imdbRating+"⭐";
}


//checks if poster is available or not and returns poster accordingly
function isPosterAvailable(element) {
  if (element.Poster != "N/A") {
    return element.Poster;
  } else {
    return "./assets/img/poster_not_found.jpg";
  }
}
