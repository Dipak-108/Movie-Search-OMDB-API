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
  }
  showResult(event);
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
    searchDiv.innerHTML = event.target.value;
    searchDiv.style.display = "block";

    if (event.target.value === "") {
      searchDiv.style.display = "none";
    }
  }, 400);
}
