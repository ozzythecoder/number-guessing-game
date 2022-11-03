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

    for (let guess of response) {
      $('#guess-output').append(`
        <tr>
          <td>${guess.numGuessed}</td>
          <td>${guess.name}</td>
          <td>${guess.hiLo}</td>
        </tr>
      `)
    }

    console.log('we got it!', response);
  }).catch( (err) => {
    console.log('shit!');
  })

}

function storeGuess() {


}