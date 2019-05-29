'use strict';

/*The user must be able to search for parks in one or more states.
The user must be able to set the max number of results, with a default of 10.
The search must trigger a call to NPS's API.
The parks in the given state must be displayed on the page. Include at least:
Full name
Description
Website URL
The user must be able to make multiple searches and see only the results for the current search.
As a stretch goal, try adding the park's address to the results.*/ 




const apiKey = 'yslv1bN9OLCEcjf0zCQhpmCnHoRwKBgdoIa1WbEs',
  searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function getResults (states, maxResults) {

  const statesList = states.split(', '),
    params = {
      stateCode: statesList,
      limit: maxResults,
      fields: 'addresses',
      api_key: apiKey,
    };

  const queryString = formatQueryParams(params),
    url = searchURL + '?' + queryString;

  fetch(url)
  .then(response => response.json())
  .then(responseJSON => displayResults(responseJSON))
  .catch(error => console.log(error));
}


function createList (responses) {
  console.log(responses);
  return responses.map(response => `
    <li>
      <div> Full Name: <a href="${response.url}" target="_blank" >${response.fullName}</a> </div>
      <div> State(s): ${response.states.split(',').join(', ')}</div>
      <div> Address: ${response.addresses[0].line1} ${response.addresses[0].line2} ${response.addresses[0].stateCode}  ${response.addresses[0].postalCode} </div>
      <div> Description: ${response.description}</div>

    </li>`
  );
}


function displayResults (responseJSON) {
// console.log(responseJSON);

  $('#results-list').empty();
  if (responseJSON.length === 0) {
    console.log('HERE err');
    $('#results-list').html(`<ul><li>No results found</li></ul>`);
    $('.results').css('display','block');
  } else {
    console.log('HERE');
    const resultsList = createList(responseJSON.data).join('<br>');
    $('#results-list').html(`<ul>${resultsList}</ul>`);
    $('.results').css('display','block');

  }
}

function submitForm() {
  $('form').submit(event => {
    event.preventDefault();
    const statesToSearch = $('#js-states-input').val(),
      maxResults = $('#js-max-results').val()-1;
    getResults(statesToSearch, maxResults);
  });
}

$(function() {
  submitForm();
});