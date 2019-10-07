const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('get req received!');
  res.end()
});

// todo: set up handler for get req to /api/movies

app.listen(port, () => {console.log(`Listening on port ${port}`)});
