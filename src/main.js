searchInput = document.getElementById("search");
searchDiv = document.getElementsByClassName("search_result_div")[0];
searchResult = document.getElementsByClassName("search_result")[0];
timeout = null;

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

function showResult(event) {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    value = event.target.value;

    getData(value);
    searchDiv.style.display = "block";

    if (event.target.value === "") {
      searchDiv.style.display = "none";
    }
  }, 400);
}

async function getData(searchQuery) {
  abc = searchQuery;

  if (abc.length < 1) {
    return;
  }

  const url = `http://www.omdbapi.com/?s=${abc}&apikey=fc1fef96`;
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
        poster = isPosterAvailable(element);

        searchDiv.insertAdjacentHTML(
          "beforeend",
          `
                <div class="search_result" id="${element.imdbID}">
                  <div class="search_img_div">
                    <img src="${poster}" alt="photo not included" />
                  </div>
                  <div class="search_detail">
                    <h2>${element.Title}</h2>
                    <p>${element.Year}</p>
                  </div>
                </div>
                  `
        );
      });
    }
  } catch (error) {
    console.error(error.message);
  }
}

function isPosterAvailable(element) {
  if (element.Poster != "N/A") {
    return element.Poster;
  } else {
    return "./assets/img/poster_not_found.jpg";
  }
}
