import React from 'react';

function Movie({movie, onclick}) {
  return (
    <div>
      <span>{movie.title}</span><button onClick={() => { onclick(movie.title)} }>{(!movie.watched) ? 'To watch' : 'Watched'}</button>
      <div hidden>
        <div>Overview: {movie.overview}</div>
        <div>Rating: {movie.voteAvg}</div>
        <div>Runtime: {movie.runtime} mins</div>
        <div>Released: {movie.releaseDate}</div>
      </div>
    </div>
  );
}

export default Movie;
