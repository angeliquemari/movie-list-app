import React from 'react';
import Movie from './Movie';

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      displayedMovies: [],
      displayWatched: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMovieAdd = this.handleMovieAdd.bind(this);
    this.toggleWatched = this.toggleWatched.bind(this);
    this.toggleWatchedList = this.toggleWatchedList.bind(this);
  };

  render() {
    return (
      <div>
        <div>
          <input id="new-movie-input" type="text"/>
          <button onClick={this.handleMovieAdd}>Add</button>
        </div>
        <div>
          <input id="search-input" type="text"/>
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <div>
          <button id="watched-button" onClick={this.toggleWatchedList}>Watched</button>
          <button id="to-watch-button" onClick={this.toggleWatchedList}>To Watch</button>
        </div>
        <div>
          {this.state.displayedMovies.map((movie, index) => <Movie key={index} title={movie.title} watched={movie.watched} onclick={this.toggleWatched} /> )}
        </div>
      </div>
    )
  }

  handleSearch() {
    var userInput = document.getElementById('search-input').value;
    var newDisplayedMovies = getSearchedMovies(userInput, this.state.movies);
    if (newDisplayedMovies.length === 0) {
      alert('No movie by that name found');
      this.setState({displayedMovies: this.state.movies}); // re-render view to show all movies
    } else {
      this.setState({displayedMovies: newDisplayedMovies}); // re-render view to just show movies matching search terms
    }
  }

  handleMovieAdd() {
    var newMovie = document.getElementById('new-movie-input').value.trim();
    if (newMovie) {
      var newMovies = this.state.movies.concat([{title: newMovie, watched: false}]);
      this.setState({
        movies: newMovies,
        displayedMovies: newMovies // re-render view to show all movies including new one
      });
    }
  }

  toggleWatched(title) {
    var newMovies = this.state.movies.slice();
    for (let i = 0; i < newMovies.length; i++) {
      if (newMovies[i].title === title) {
        newMovies[i].watched = !newMovies[i].watched;
        break;
      }
    }
    this.setState({
      movies: newMovies,
      displayedMovies: newMovies
    });
  }

  toggleWatchedList() {
    console.log('click!');
  }
}

var getSearchedMovies= function(userInput, movies) {
  var searchedMovies = [];
  var searchTerms = userInput.split(' ');
  for (let i = 0; i < movies.length; i++) {
    var movie = movies[i];
    var movieTitleWords = movie.title.split(' ');
    for (let j = 0; j < movieTitleWords.length; j++) {
      for (let k = 0; k < searchTerms.length; k++) {
        if (movieTitleWords[j].toLowerCase() === searchTerms[k].toLowerCase()) {
          searchedMovies.push(movie);
        }
      }
    }
  }
  return searchedMovies;
}

export default MovieList;
