const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('get req received!');
  res.end()
});

app.listen(port, () => {console.log(`Listening on port ${port}`)});
