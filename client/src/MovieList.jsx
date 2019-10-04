import React from 'react';
import Movie from './Movie';

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchedMovies: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMovieAdd = this.handleMovieAdd.bind(this);
    this.toggleWatched = this.toggleWatched.bind(this);
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
          {this.state.searchedMovies.map((movie, index) => <Movie key={index} title={movie.title} watched={movie.watched} onclick={this.toggleWatched} /> )}
        </div>
      </div>
    )
  }

  handleSearch() {
    var userInput = document.getElementById('search-input').value;
    var newSearchedMovies = getSearchedMovies(userInput, this.state.movies);
    if (newSearchedMovies.length === 0) {
      alert('No movie by that name found');
      this.setState({searchedMovies: this.state.movies}); // re-render view to show all movies
    } else {
      newSearchedMovies = newSearchedMovies.map((movie) => { return {title: movie} } );
      this.setState({searchedMovies: newSearchedMovies}); // re-render view to just show movies matching search terms
    }
  }

  handleMovieAdd() {
    var newMovie = document.getElementById('new-movie-input').value.trim();
    if (newMovie) {
      var newMovies = this.state.movies.concat([{title: newMovie, watched: false}]);
      this.setState({
        movies: newMovies,
        searchedMovies: newMovies // re-render view to show all movies including new one
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
      searchedMovies: newMovies
    });
  }
}

var getSearchedMovies= function(userInput, movies) {
  var searchTerms = userInput.split(' ');
  movies = movies.map(movie => movie['title']);
  return movies.filter((movie) => {
    var movieWords = movie.split(' ');
    for (let i = 0; i < movieWords.length; i++) {
      for (let j = 0; j < searchTerms.length; j++) {
        if (movieWords[i].toLowerCase() === searchTerms[j].toLowerCase()) return true;
      }
    }
    return false;
  });
}

export default MovieList;
