import React from 'react';
import Movie from './Movie';

class MovieList extends React.Component {
  render() {
    return (
      <div>
        {this.props.movies.map((movie, index) => <Movie key={index} title={movie.title} /> )}
      </div>
    )
  }
}

export default MovieList;
