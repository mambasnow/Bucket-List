const movieApiKey = "f59588f382c7895cd8d35268297e4979";

//for search function - amalec 




const movieSearchUrl = "https://api.themoviedb.org/3/search" + movieApiKey + "&page=1";

fetch(movieSearchUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    }
  });