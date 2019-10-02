import React from 'react';
import ReactDOM from 'react-dom';
import MovieList from './src/MovieList';

var movies = [
  {title: 'Mean Girls'},
  {title: 'Hackers'},
  {title: 'The Grey'},
  {title: 'Sunshine'},
  {title: 'Ex Machina'},
];

ReactDOM.render(<MovieList movies={movies}/>, document.getElementById('app'));
