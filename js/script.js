const movieApiKey = "f59588f382c7895cd8d35268297e4979";

//for search function - amalec 
//this is for the card with the movie information
var resultArea = document.querySelector("#results");
var searchTerm = $("#movieSearch").val();

//
// const movieSearchUrl = "https://api.themoviedb.org/3/search" + movieApiKey + "&page=1";
var movieSearchUrl=`https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${searchTerm}`;
//var movieSearchUrl=`https://api.themoviedb.org/3/movie/${searchedMovie}?api_key=${movieApiKey}&language=en-US`;
fetch(movieSearchUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //I used the data to populate part of the results
    //only displays one
    console.log(data);// json 
    console.log(data.genres); //gives the Genres
    console.log(data.original_title); //gives the Movie tittle
    console.log(data.overview); //gives the movie description
    console.log(data.poster_path); //gives the path to get the image. not the image itself
    $("#results").append(`    <div class="card result-cards">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="http://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.original_title}">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">${data.original_title}</p>
        </div>
      </div>
  
      <div class="content">
      <p class="movie-overview"> movie summary</p>
      ${data.overview}
        <ul>
            <p> Genres:</p>
            <li id="genre1">${data.genres[0].name}</li>
            <li id="genre2">${data.genres[1].name}</li>
            <li id="genre3">${data.genres[2].name}</li>
        </ul>
      </div>
    </div>
  </div>`);
    }
  );
//this is the initial link to add the and image
//  http://image.tmdb.org/t/p/w500/


