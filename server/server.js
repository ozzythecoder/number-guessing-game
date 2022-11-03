const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let getRandomInteger = require('./modules/randomNum');
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// function to get random number
// function getRandomInteger(min, max) {
//   return Math.floor(Math.random() * (1 + max - min) + min);
// }

// Game set-up
let guessArray = []; // will hold all previous guesses
let theNumber;

app.post('/gameinit', (req, res) => {
  
  // get min & max values sent from ajax
  let minMax = req.body;
  
  console.log('min', minMax.min, 'max', minMax.max);

  // set new secret number from specified values
  theNumber = getRandomInteger(minMax.min, minMax.max);

  res.sendStatus(200);
})

// retrieve guesses for render
app.get('/guesses', (req, res) => {
  console.log('retrieving guesses');
  console.log(guessArray);
  res.send(guessArray); // sends guess array to ajax in render() function
})

app.post('/guesses', (req, res) => {
  console.log('posting guesses');

  // assign data from POST request to a variable
  let guessObj = req.body;

  // compare player 1's guesses to the secret number and assign a new property based on comparison
  if (guessObj.augustGuess > theNumber) {
    guessObj.augustHiLo = 'High' // this property is being CREATED here
  } else if (guessObj.augustGuess < theNumber) {
    guessObj.augustHiLo = 'Low'
  } else if (guessObj.augustGuess == theNumber) {
    guessObj.augustHiLo = 'Correct'
  }

  // ditto for player 2
  if (guessObj.jaredGuess > theNumber) {
    guessObj.jaredHiLo = 'High'
  } else if (guessObj.jaredGuess < theNumber) {
    guessObj.jaredHiLo = 'Low'
  } else if (guessObj.jaredGuess == theNumber) {
    guessObj.jaredHiLo = 'Correct'
  }

  // push object to the array of all guesses
  guessArray.push(guessObj);

  console.log('the latest guesses are:', guessObj);

  // let ajax know the data was handled successfully
  res.sendStatus(200);
})

app.post('/reset', (req, res) => {

  // wipe array of guesses
  guessArray = [];

  // generate new number
  theNumber = getRandomInteger(1, 25);

  res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})