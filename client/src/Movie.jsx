import React from 'react';

function Movie({movie, showPanel, titleclick, onclick}) {
  return (
    <div>
      <span onClick={ () => {titleclick(movie.title)} } >{movie.title}</span><button onClick={() => { onclick(movie.title)} }>{(!movie.watched) ? 'To watch' : 'Watched'}</button>
      {showPanel &&
      <div>
        <div>Hardcoded overview etc.</div>
        {/* <div>Overview: {movie.overview}</div>
        <div>Rating: {movie.voteAvg}</div>
        <div>Runtime: {movie.runtime} mins</div>
        <div>Released: {movie.releaseDate}</div> */}
      </div>}
    </div>
  );
}

export default Movie;
