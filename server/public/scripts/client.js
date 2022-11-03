$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#submit-btn').on('click', storeGuess);
  $('#win-message').on('click', '#play-again', resetGame);
  render();
}



function render() {
  console.log('in render()');
  $.ajax({
    method: 'GET',
    url: '/guesses'
  }).then( (response) => {
    $('#guess-output').empty();

    for (let guesses of response) {

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

      if (guesses.augustHiLo == 'Correct') {
        getWinState('August');
        break;
      } else if (guesses.jaredHiLo == 'Correct') {
        getWinState('Jared');
        break;
      }
    } // end for loop

    console.log('we got it!', response);
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
    emptyInputs();
    render();
  }).catch( (err) => {
    console.log('whyyyyy 😭');
  }) // end ajax

}

function emptyInputs() {
  $('#august-guess').val('');
  $('#jared-guess').val('');
}

function getWinState(winner) {
  //announce the winner
  $('#guess-output').empty();

  //append 'play again?' button (send to server)
  //(new get function to the server)
  $('#win-message').append(`
    <div id="you-won">
      <h1>Congratulations, ${winner}!!</h1>
      <button id="play-again">Play Again??</button>
    </div>
  `)
}

function resetGame() {
  $.ajax({
    method: 'POST',
    url: '/reset',
    data: { reset: true }
  }).then( (res) => {
    $('#win-message').empty();
    render(); // should render empty array and allow new guesses  
  }).catch( (err) => {
    alert('epic fail 😈');
  })
}