import refs from './refs.js';
const _ = require('lodash');

refs.formCountryNameInput.value = '';

const searchQuery = _.debounce(() => {
  fetchCountries(refs.formCountryNameInput.value);
}, 500);

function fetchCountries(searchQuery) {
  if (searchQuery === '') {
    return;
  }
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
      return response.json();
    })
    .then(data => data.map(data => data.name))
    .then(console.log);
}

refs.formCountryNameInput.addEventListener('input', searchQuery);

export default fetchCountries;
