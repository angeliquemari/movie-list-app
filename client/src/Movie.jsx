import React from 'react';

function Movie({title, watched, onclick}) {
  return (
    <div>
      <span>{title}</span><button onClick={() => { onclick(title)} }>{(!watched) ? 'To watch' : 'Watched'}</button>
    </div>
  );
}

export default Movie;
