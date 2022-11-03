const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));
const guessArray = [{
  augustGuess: 9,
  augustHiLo: null,
  jaredGuess: 12,
  jaredHiLo: null
}
];

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

let theNumber = getRandomInteger(1, 25);
console.log('The number is:', theNumber);

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
    guessObj.augustHiLo = 'Winner!'
  }

  if (guessObj.jaredGuess > theNumber) {
    guessObj.jaredHiLo = 'High'
  } else if (guessObj.jaredGuess < theNumber) {
    guessObj.jaredHiLo = 'Low'
  } else if (guessObj.jaredGuess == theNumber) {
    guessObj.jaredHiLo = 'Winner!'
  }

  guessArray.push(guessObj);
  console.log('the latest guesses are:', guessObj);

  res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})