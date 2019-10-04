import React from 'react';
import Movie from './Movie';

// var initialMovieList = [
//   {title: 'Mean Girls'},
//   {title: 'Hackers'},
//   {title: 'The Grey'},
//   {title: 'Sunshine'},
//   {title: 'Ex Machina'},
// ];

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   movies: initialMovieList,
    //   searchedMovies: initialMovieList
    // };
    this.state = {
      movies: [],
      searchedMovies: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMovieAdd = this.handleMovieAdd.bind(this);
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
          {this.state.searchedMovies.map((movie, index) => <Movie key={index} title={movie.title} /> )}
        </div>
      </div>
    )
  }

  handleSearch(e) {
    e.preventDefault();
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

  handleMovieAdd(e) {
    e.preventDefault();
    var newMovie = document.getElementById('new-movie-input').value.trim();
    if (newMovie) {
      var newMovies = this.state.movies.concat([{title: newMovie}]);
      this.setState({
        movies: newMovies,
        searchedMovies: newMovies // re-render view to show all movies including new one
      });
    }
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
