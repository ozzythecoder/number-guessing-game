$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")

  render();
}

function render() {
  console.log('in render()');
  $.ajax({
    method: 'GET',
    url: '/guesses'
  }).then( (res) => {
    console.log('we got it!', res);
  }).catch( (err) => {
    console.log('shit!');
  })

}