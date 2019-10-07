import React from 'react';

function Movie({movie, showPanel, titleclick, onchange}) {
  return (
    <div>
      <div onClick={ () => {titleclick(movie.title)} } >{movie.title}</div>
      {showPanel &&
      <div>
        <div>Overview: some text</div>
        <div>Rating: some number</div>
        <div>Runtime: some # of mins</div>
        <div>Released: some date/year</div>
        {/* <div>Overview: {movie.overview}</div>
        <div>Rating: {movie.voteAvg}</div>
        <div>Runtime: {movie.runtime} mins</div>
        <div>Released: {movie.releaseDate}</div> */}
        {/* <button onClick={() => { onclick(movie.title)} }>{(!movie.watched) ? 'To watch' : 'Watched'}</button> */}
        <input type="checkbox" checked={movie.watched} onChange={() => { onchange(movie.title)} }/><label>Watched</label>
      </div>}
    </div>
  );
}

export default Movie;
