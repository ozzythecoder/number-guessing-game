$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#start-game').on('click', gameInit);

  $('#submit-btn').on('click', storeGuess);

  // need to target element that exists on page load:
  // (in win-message, on click of play-again, run resetGame)
  // $('#win-message').on('click', '#play-again', resetGame);
  render();
}

function gameInit() {

  console.log('in gameinit');
  $.ajax({
    method: 'POST',
    url: '/gameinit',
    data: {
      min: $('#min-value').val(),
      max: $('#max-value').val()
    }
  }).then( (res) => {
    console.log('game init successful!');
    $('#win-message').empty();
    render();
    freezeInputs(true);
  }).catch( (err) => {
    console.log('arf');
  })
}

function freezeInputs(freeze) { // accepts a boolean
  $('#min-value').prop('disabled', freeze)
  $('#max-value').prop('disabled', freeze)
  $('#start-game').prop('disabled', freeze)
}

function render() {
  console.log('in render()');
  $.ajax({
    method: 'GET',
    url: '/guesses'
  }).then( (response) => {
    $('#guess-output').empty(); // empties table

    for (let guesses of response) { // receives guess array from server
      
      // appends contents of each object in "response" to the DOM
      $('#guess-output').append(`
        <tr>
          <td>${guesses.augustGuess}</td>
          <td>${guesses.augustHiLo}</td>
          <td>August</td>
        </tr>
        <tr>
          <td>${guesses.jaredGuess}</td>
          <td>${guesses.jaredHiLo}</td>
          <td>Jared</td>
        </tr>
      `) // end append

      // during each loop, read if there was a correct guess:
      // if (guesses.augustHiLo == 'Correct') {
      //   getWinState('August'); // if there was, run the winning function
      //   break; // and then immediately exit the for loop
      // } else if (guesses.jaredHiLo == 'Correct') {
      //   getWinState('Jared');
      //   break;
      // }
    } // end for loop

  }).catch( (err) => {
    console.log('shit!');
  }) // end ajax

}

function storeGuess() {
  console.log('in storeGuess');

  $.ajax({
    method: 'POST',
    url: '/guesses',
    data: {
      augustGuess: $('#august-guess').val(),
      jaredGuess: $('#jared-guess').val()
    }
  }).then( (res) => {
    console.log('success!');

    emptyInputs(); // empty the guess inputs
    render(); // re-render DOM with latest guess in the array
    checkForWin(); // check if there's a winner
  }).catch( (err) => {
    console.log('whyyyyy ????');
  }) // end ajax

}

function checkForWin() {
  $.ajax({
    method: 'GET',
    url: '/guesses'
  }).then( (response) => {
    let lastGuess = response[response.length - 1];

    if (lastGuess.augustHiLo == 'Correct' && lastGuess.jaredHiLo == 'Correct') {
      getTieState();
    } else if (lastGuess.augustHiLo == 'Correct') {
      getWinState('August');
    } else if (lastGuess.jaredHiLo == 'Correct') {
      getWinState('Jared');
    } // end else if

  }).catch((err) => {
    console.log('argh');
  })
}

function emptyInputs() {
  $('#august-guess').val('');
  $('#jared-guess').val('');
}

function getWinState(winner) {
  //announce the winner
  $('#guess-output').empty();
  freezeInputs(false);

  //append 'play again?' button (send to server)
  //(new get function to the server)
  $('#win-message').append(`
    <div id="you-won">
    <div>
      <h1>Congratulations, ${winner}!!</h1>
      <p>Set some new values to play again!</p>
    </div>
    </div>
  `)
}

function getTieState() {
  $('#guess-output').empty();
  freezeInputs(false);

  //append 'play again?' button (send to server)
  //(new get function to the server)
  $('#win-message').append(`
    <div id="you-won">
    <div>
      <h1>It's a tie?!!?!!</h1>
      <p>I hate ties!! Set some new values and settle this!</p>
    </div>
    </div>
  `)

}

// function resetGame() {

//   $.ajax({
//     method: 'POST',
//     url: '/reset',
//     data: { reset: true } // idk man, we gotta send something right?
//   }).then( (res) => {
//     $('#win-message').empty(); // delete the win message
//     render(); // should render empty array and allow new guesses  
//   }).catch( (err) => {
//     alert('epic fail ????');
//   })

// }