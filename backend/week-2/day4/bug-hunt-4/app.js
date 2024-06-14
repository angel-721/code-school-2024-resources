let bad_movies = [];

let bad_movies_ul = document.getElementById("bad-movies-list");
let add_button = document.getElementById("bad-movie-button");
let bad_movie_input = document.getElementById("text-input");
let rating_input = document.getElementById("rating-input");

let reload_list = () => {
  // BUG - I want to be setting the innerHTML here
  bad_movies_ul.innerHTML === "";

  // BUG - I let autocomplete add an extra word for me
  bad_movies.array.forEach((b_movie) => {
    // BUG - Look at the what the variable say's the element should be
    let bad_movie_li = document.createElement(".p");
    bad_movie_li.innerHTML =
      "movie: " + b_movie.name + " rating: " + b_movie.rating + " Out of 10";

    // BUG x2
    // BUG 1 - how do add a child to a html element?
    // BUG 2 - we want to be adding a html element as a child, not a javascript
    // 				 object
    bad_movies_ul.push(bad_movie);
  });
};

add_button.onclick = () => {
  // BUG one of these are right and the other is wrong
  if (bad_movie_input.value === "" || rating_input.input === "") {
    alert("No empty things");
    return;
  }
  let new_movie = {};

  // BUG - both look at both inputs
  new_movie.name = bad_movie_input.input;
  new_movie.rating = rating_input;

  // BUG - make sure you add something to a javascript array
  bad_movies.appendChild(new_movie);

  reload_list();
  bad_movie_input.value = "";
  rating_input.value = "";
};

reload_list();

// fun challenge for those who want to:
// sort bad_movies by rating, highest at the top and lowest at the bottom
// You will want to do this in reload_list before you loop through bad_movies to
// make li's for each bad_movie
