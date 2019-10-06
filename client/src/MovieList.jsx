import React from 'react';
import Movie from './Movie';

var movieData = [
  {title: 'Legally Blonde', watched: false, releaseDate: '2001-07-13', runtime: 96, overview: 'some info', voteAvg: 6},
  {title: 'V for Vendetta', watched: false, releaseDate: '2006-03-17', runtime: 132, overview: 'some info', voteAvg: 7},
  {title: 'Gone With The Wind', watched: false, releaseDate: '1940-01-17', runtime: 226, overview: 'some info', voteAvg: 8}
];
var displayedMovies = Array(movieData.length).fill(0).map((item, index) => index);

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: movieData, //[],
      displayedMovies: displayedMovies, //[],
      displayWatched: false,
      displayedMoviePanels: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMovieAdd = this.handleMovieAdd.bind(this);
    this.toggleWatched = this.toggleWatched.bind(this);
    this.toggleWatchedList = this.toggleWatchedList.bind(this);
    this.showMoviePanel = this.showMoviePanel.bind(this);
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
          <button id="watched-button" onClick={() => { this.toggleWatchedList(true) }}>Watched</button>
          <button id="to-watch-button" onClick={() => { this.toggleWatchedList(false) }}>To Watch</button>
        </div>
        <div>
          {this.state.displayedMovies.map((pointer, index) => <Movie key={index} movie={this.state.movies[pointer]} onclick={this.toggleWatched} showpanel={this.showMoviePanel} /> )}
        </div>
      </div>
    )
  }

  resetDisplayedMovies(movies = this.state.movies) {
    return Array(movies.length).fill(0).map((item, index) => index);
  }

  handleSearch() {
    var userInput = document.getElementById('search-input').value;
    var newDisplayedMovies = getSearchedMovies(userInput, this.state.movies);
    if (newDisplayedMovies.length === 0) {
      alert('No movie by that name found');
      this.setState({displayedMovies: this.resetDisplayedMovies()}); // re-render shows all movies
    } else {
      this.setState({displayedMovies: newDisplayedMovies}); // re-render shows just movies matching search terms
    }
  }

  handleMovieAdd() {
    var newMovie = document.getElementById('new-movie-input').value.trim();
    if (newMovie) {
      var newMovies = this.state.movies.concat([{title: newMovie, watched: false}]);
      var newDisplayedMovies = this.resetDisplayedMovies(newMovies);
      this.setState({
        movies: newMovies,
        displayedMovies: newDisplayedMovies // re-render shows all movies including new one
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
      movies: newMovies
    });
  }

  toggleWatchedList(getWatched) {
    var newDisplayedMovies = [];
    for (let i = 0; i < this.state.movies.length; i++) {
      var movieWatched = this.state.movies[i].watched;
      if (getWatched && movieWatched) newDisplayedMovies.push(i);
      if (!getWatched && !movieWatched) newDisplayedMovies.push(i);
    }
    this.setState({
      displayedMovies: newDisplayedMovies
    });
  }

  showMoviePanel(title) {
    // ideally get index of title, add to array of which movies are displaying their panel
    // need to figure out how this info will get passed down to Movie component
    // and component is written so that it can selectively display a panel
    // var newdisplayedMoviePanels = displayedMoviePanels.slice();
    // for (let i = 0; i < newMovies.length; i++) {
    //   if (newMovies[i].title === title) {
    //     newdisplayedMoviePanels.push(i);
    //     break;
    //   }
    // }
    // this.setState({
    //   displayedMoviePanels: newdisplayedMoviePanels
    // });
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
          searchedMovies.push(i);
        }
      }
    }
  }
  return searchedMovies;
}

export default MovieList;
