'use strict';


function getResults (parkName, maxResults) {
  const url = ``;

  fetch(url)
  .then(response => response.json())
  .then(responseJSON => console.log(responseJSON))
  .catch(error => console.log(error));
}



function submitForm() {
  $('form').submit(event => {
    event.preventDefault();
    const parkToFind = $('#js-park-name').val(),
      maxResults = $('js-max-results').val();
    getResults(parkToFind, maxResults);
  });
}

$(function() {
  submitForm();
});