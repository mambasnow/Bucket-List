const movieApiKey = "f59588f382c7895cd8d35268297e4979";

//for search function - amalec 
//this is for the card with the movie information 
//Also for reviews of the movies as well . 
var resultArea = document.querySelector("#results"); 



$("#searchBtn").click(function(){ 
 
  var movieSearchUrl=`https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${$("#movieSearch").val() }`; 

 
  


  fetch(movieSearchUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //I used the data to populate part of the results
    //only displays one
    // console.log(data);// json 
    // console.log(data.genres); //gives the Genres
    // console.log(data.original_title); //gives the Movie tittle
    // console.log(data.overview); //gives the movie description
    // console.log(data.poster_path); //gives the path to get the image. not the image itself
    //console.log(data.results[i].title); 
    
    for(i=0; i<10; i++){ $("#results").append(`    
    <div class="card column ">
      <div class="card-image ">
        <figure class="image is-4by3">
          <img src="http://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">${data.results[i].title}</p>
          </div>
        </div>

      <div class="content">
      <p class="movie-overview"> movie summary</p>
      <p>${data.results[i].overview}</p>
       
        </div>
      </div>
    </div>`);
    }
  });
});

  //Movie Review Api function . 
  //var reviewsArea = document.querySelector("#reviews"); 
  
    
  //var movieReviewUrl=`https://api.nytimes.com/svc/movies/v2/reviews/picks.json?order=by-publication-date&api-key=52r5MjsfbPQO7USvr34rtacLDbMv8AMP`
    
    fetch("https://api.nytimes.com/svc/movies/v2/reviews/picks.json?order=by-publication-date&api-key=52r5MjsfbPQO7USvr34rtacLDbMv8AMP")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then(data => {
      console.log(data);
      const reviewElement = $("#reviews")
      reviewElement.innerText = data.results[0].display_title
       
        
      var titles =''  
      for (let i=0; i<10; i++){ 
        console.log(i, data.results[i])
        console.log(i, data.results[i].display_title)
        // titles = titles + data.results[i].display_title  

        // $("#findPicks").("reviews");
        reviewElement.append(`<a href="${data.results[i].link.url}" target="_blank"><button class="button is-info">${data.results[i].display_title }</button></a>`)
      }
    
    })
    .catch((error) => console.error("FETCH ERROR:", error)); 

     


// no longer need this correct code is in line 1-49
// //
// // const movieSearchUrl = "https://api.themoviedb.org/3/search" + movieApiKey + "&page=1";
// var movieSearchUrl=`https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${searchTerm}`;
// //var movieSearchUrl=`https://api.themoviedb.org/3/movie/${searchedMovie}?api_key=${movieApiKey}&language=en-US`;
// fetch(movieSearchUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     //I used the data to populate part of the results
//     //only displays one
//     console.log(data);// json 
//     console.log(data.genres); //gives the Genres
//     console.log(data.original_title); //gives the Movie tittle
//     console.log(data.overview); //gives the movie description
//     console.log(data.poster_path); //gives the path to get the image. not the image itself
//     $("#results").append(`    <div class="card result-cards">
//     <div class="card-image">
//       <figure class="image is-4by3">
//         <img src="http://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.original_title}">
//       </figure>
//     </div>
//     <div class="card-content">
//       <div class="media">
//         <div class="media-content">
//           <p class="title is-4">${data.original_title}</p>
//         </div>
//       </div>
  
//       <div class="content">
//       <p class="movie-overview"> movie summary</p>
//       ${data.overview}
//         <ul>
//             <p> Genres:</p>
//             <li id="genre1">${data.genres[0].name}</li>
//             <li id="genre2">${data.genres[1].name}</li>
//             <li id="genre3">${data.genres[2].name}</li>
//         </ul>
//       </div>
//     </div>
//   </div>`);
//     }
//   );
// //this is the initial link to add the and image
// //  http://image.tmdb.org/t/p/w500/


