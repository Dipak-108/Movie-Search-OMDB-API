searchInput = document.getElementById("search");
searchDiv = document.getElementsByClassName("search_result_div")[0];
searchResult = document.getElementsByClassName("search_result")[0];
timeout = null;


searchInput.addEventListener("keydown", (event) => {
clearTimeout(timeout);

  timeout = setTimeout(showResult, 300);

  function showResult() {
    searchDiv.style.display = "block";
    searchDiv.innerHTML = event.target.value;

    if (event.target.value === "") {
      searchDiv.style.display = "none";
    }
  }
});


//makes search div display to none if clicked anywhere except search bar
document.addEventListener("click", (event) => {
  if (event.target !== searchInput) {
    searchDiv.style.display = "none";
  }
});

//makes search div display to block if clicked on search bar
searchInput.addEventListener("click", (event) => {
  if (searchInput.value.length > 1) {
    searchDiv.style.display = "block";
  }
});


