$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#submit-btn').on('click', storeGuess);
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
  }).catch( (err) => {
    console.log('whyyyyy 😭');
  }) // end ajax

}