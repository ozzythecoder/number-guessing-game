const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

// Game set-up
let guessArray = [];
let theNumber = getRandomInteger(1, 25);

// GET & POST Routes go here
app.get('/guesses', (req, res) => {
  console.log('retrieving guesses');
  console.log(guessArray);
  res.send(guessArray);
})

app.post('/guesses', (req, res) => {
  console.log('posting guesses');

  let guessObj = req.body;
  if (guessObj.augustGuess > theNumber) {
    guessObj.augustHiLo = 'High'
  } else if (guessObj.augustGuess < theNumber) {
    guessObj.augustHiLo = 'Low'
  } else if (guessObj.augustGuess == theNumber) {
    guessObj.augustHiLo = 'Correct'
  }

  if (guessObj.jaredGuess > theNumber) {
    guessObj.jaredHiLo = 'High'
  } else if (guessObj.jaredGuess < theNumber) {
    guessObj.jaredHiLo = 'Low'
  } else if (guessObj.jaredGuess == theNumber) {
    guessObj.jaredHiLo = 'Correct'
  }

  guessArray.push(guessObj);
  console.log('the latest guesses are:', guessObj);

  res.sendStatus(200);
})

app.post('/reset', (req, res) => {
  console.log('in reset route');

  // wipe array of guesses
  guessArray = [];
  console.log('should be empty:', guessArray);

  // generate new number
  theNumber = getRandomInteger(1, 25);

  res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})