const movieApiKey = "f59588f382c7895cd8d35268297e4979";

//for search function - amalec 
//this is for the card with the movie information
var resultArea = document.querySelector("#results");





$("#searchBtn").click(function() {

	var movieSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${$("#movieSearch").val() }`;
  $("#resultsText").text("Search Results:");


	fetch(movieSearchUrl)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			//I used the data to populate part of the results
			//only displays one
			// console.log(data);// json 
			// console.log(data.genres); //gives the Genres
			// console.log(data.original_title); //gives the Movie tittle
			// console.log(data.overview); //gives the movie description
			// console.log(data.poster_path); //gives the path to get the image. not the image itself
			//console.log(data.results[i].title); 


			//empties the results of movies
			$('#results').empty();

			for (i = 0; i < 10; i++) {
				$("#results").append(`    
    <div id="movieSearches" class="card column ">
      <div class="card-image ">
        <figure class="image is-4by3">
          <img src="http://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
        </figure>
      </div>
      <div class="card-content" id="${data.results[i].id}">
        <div class="media">
          <div class="media-content">
            <p class="title is-4 movie-tittle" >${data.results[i].title}</p>
          </div>
        </div>

      <div class="content">
      <p class="movie-overview"> movie summary</p>
      <p>${data.results[i].overview}</p>
       
        </div>
        <button  class="button is-primary is-light addMovie" data-title="${data.results[i].title}" data-image="${data.results[i].poster_path}" data-overview="${data.results[i].overview}"><i class="fas fa-ticket-alt"> Add to my list</i></button>
        <button class="button is-link is-light" id="trailerModal">Watch Trailer</button>
        </div>
    </div>`);
			}
			modalFeature();
		});
});


function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}




// function that will run inside click for genres   
function genreButtonEvent(event) {

  let randomPage = getRandomInt(500);
  let selectedMovieId = $(this).attr("id");
  let genreSearchURL = `https://api.themoviedb.org/3/genre/${selectedMovieId}/movies?api_key=${movieApiKey}&language=en-US&page=${randomPage}`;
  
  $("#resultsText").text(`Random movies for ${$(this).text()}:`);


	fetch(genreSearchURL)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			console.log(data);

			// need to grab 10 random movies from random pages
			$('#results').empty();

			for (i = 0; i < 10; i++) {
				$("#results").append(`    
    <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="http://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}" data-image="${data.results[i].poster_path}">
      </figure>
    </div>
    <div class="card-content" id="${data.results[i].id}">
      <div class="media">
        <div class="media-left">
        </div>
        <div class="media-content">
          <p class="title is-4">${data.results[i].title}</p>
        </div>
      </div>
  
      <div class="content">
      <p>${data.results[i].overview}</p>
       
        </div>
        <button  class="button is-primary is-light addMovie" data-title="${data.results[i].title}" data-image="${data.results[i].poster_path}" data-overview="${data.results[i].overview}"><i class="fas fa-ticket-alt"> Add to my list</i></button>
        <button  class="button is-link is-light" id="trailerModal">Watch Trailer</button>
        </div>
    </div>
  </div>`);
			}
			modalFeature();
		});


}

/// populates movies accordingly to selected genre
$('.genreButton').click(genreButtonEvent);






//this array will store the saved movies list
var myMovieList = [];


// this will be a function to add the movies to the list
function addingMoviesToList() {
	$("body").on("click", ".addMovie", function() {
		// console.log($(this).data("title"));//This is the title that will be added to the list buttons
		var movieTitleItem = $(this).data("title");
		var movieImageItem = $(this).data("image");
		var movieOverviewItem = $(this).data("overview");
		// console.log(movieImageItem);
		$("#generatedList").append(`
  <div class="card remove-here">
  <button class="button is-fullwidth is-danger is-light remove" >Remove</button>
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="http://image.tmdb.org/t/p/w500/${movieImageItem}" alt="${movieTitleItem}"">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
      </div>
      <div class="media-content">
        <p class="title is-4">${movieTitleItem}</p>
      </div>
    </div>

    <div class="content">
    <p>${movieOverviewItem}</p>

  </div>
</div>

  `);

		myMovieList.push({
			"title": movieTitleItem,
			"image": movieImageItem,
			"overview": movieOverviewItem
		});
		localStorage.setItem("movie", JSON.stringify(myMovieList));
	})
}


function modalFeature() {
	$("body").on("click", "#trailerModal", function() {
		// console.log($(this).data("title"));//This is the title that will be added to the list buttons
		$('.modal').addClass('is-active');
		let trailerURL = `https://api.themoviedb.org/3/movie/${$(this).parent().attr("id")}?api_key=${movieApiKey}&append_to_response=videos`;
		let youtubeLink = `https://www.youtube.com/embed/`;
		console.log(trailerURL);

		fetch(trailerURL)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				$(`.modal-content`).append(`
        <iframe class="videoPlayer" width="853" height="505"
        src="${youtubeLink + data.videos.results[0].key}">
        </iframe>
        `)


			});
	})
}



// this function displays the saved movies from local storage

function displaySavedMovies() {
	var storedMovies = JSON.parse(localStorage.getItem("movie"));
	console.log(storedMovies);
	if (storedMovies !== null) {
		myMovieList = storedMovies;
		for (var i = 0; i < storedMovies.length; i++) {
			var movieTittles = storedMovies[i].title;
			var movieOverviews = storedMovies[i].overview;
			var movieImages = storedMovies[i].image;


			$('#generatedList').append(`
      <div class="card remove-here">
      <button class="button is-fullwidth is-danger is-light remove" >Remove</button>
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="http://image.tmdb.org/t/p/w500/${movieImages}" alt="${movieTittles}"">
        </figure>
        
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
          </div>
          <div class="media-content">
            <p class="title is-4">${movieTittles}</p>
          </div>
        </div>
    
        <div class="content">
        <p>${movieOverviews}</p>
      </div>
      
      
    </div>
      `);
		}

	}
}

function removeMovie(){
  $("body").on("click", ".remove", function() {
    // console.log("click")
    // localStorage.removeItem("movieTittles");
    console.log($(this).parent());
    $(this).parent().remove();
    storedMovies = JSON.parse(localStorage.getItem("movie"));
    myMovieList.splice(0,1);
    localStorage.setItem("movie", JSON.stringify(myMovieList));
  })
  
}
function clearMovieLIst(){
  $("#clear-list").click(function(){
   localStorage.removeItem("movie");
   $("div").remove("#generatedList");
  })
}
clearMovieLIst();






//Critics Review pull and links 

function articleApipull() {
	fetch("https://api.nytimes.com/svc/movies/v2/reviews/picks.json?order=by-publication-date&api-key=52r5MjsfbPQO7USvr34rtacLDbMv8AMP")
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("NETWORK RESPONSE ERROR");
			}
		})
		.then(data => {
			// console.log(data);
			const reviewElement = $("#reviews")
			reviewElement.innerText = data.results[0].display_title


			var titles = ''
			for (let i = 0; i < 5; i++) {
				// console.log(i, data.results[i])
				// console.log(i, data.results[i].display_title)
				// titles = titles + data.results[i].display_title  

				// $("#findPicks").("reviews");${da
				//reviewElement.append(`<a href="${data.results[i].link.url}" target="_blank"><img src="${data.results[i].multimedia.src}><button class="button  is-normal genreButton">${data.results[i].display_title }</button></a>`)
				//reviewElement.append(`<a href="${data.results[i].link.url}" ${data.results[i].display_title }target="_blank"><img src="${data.results[i].multimedia.src}"></a>`)
				reviewElement.append(`<div class="card column articleCards">
        <div class="card-image">
          <figure class="image is-4by3">
          <a href="${data.results[i].link.url}" target="_blank" ><img src="${data.results[i].multimedia.src}"></a>
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left"> 
            </div>
            <div class="media-content ">
            <p style="text-align:center">${data.results[i].display_title}</p>
            <p style="font-weight: bold; text-align:center">Author: ${data.results[i].byline}</p>
            </div>
          </div>`)
					// console.log('data.results[i].multimedia.src',data.results[i].multimedia.src)
				if ($("data.results[i].multimedia.src")) {}
			}
		})
		.catch((error) => console.error("FETCH ERROR:", error));
};

function popularMovies() {
	let popularMovieLink = `https://api.themoviedb.org/3/discover/movie?api_key=${movieApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
	fetch(popularMovieLink)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			console.log(data);
			// need to grab 10 random movies from random pages
			$('#results').empty();
			for (i = 0; i < 10; i++) {
				$("#results").append(`    
    <div class="card" >
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="http://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
      </figure>
    </div>
    <div class="card-content" id="${data.results[i].id}">
      <div class="media">
        <div class="media-left">
        </div>
        <div class="media-content">
          <p class="title is-4">${data.results[i].title}</p>
        </div>
      </div>
      <div class="content">
      <p>${data.results[i].overview}</p>
        </div>
        <button  class="button is-primary is-light addMovie" data-title="${data.results[i].title}" data-image="${data.results[i].poster_path}" data-overview="${data.results[i].overview}"><i class="fas fa-ticket-alt"> Add to my list</i></button>
        <button class="button is-link is-light" id="trailerModal">Watch Trailer</button>
      </div>
    </div>
  </div>`);

			}
			modalFeature();
		});
}






//// function execute when document is fully loaded
$(document).ready(function() {
	articleApipull();
	popularMovies();
	addingMoviesToList();
	displaySavedMovies();
  removeMovie();


	$(".modal-background").click(function() {
		$(".modal").removeClass("is-active");
		$(".modal-content").empty();
	})
})