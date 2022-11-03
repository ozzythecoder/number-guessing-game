const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));
const guessArray = ['some stuff'];

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

// GET & POST Routes go here
app.get('/guesses', (req, res) => {
  console.log('retrieving guesses');
  console.log(guessArray);
  res.send(guessArray);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})