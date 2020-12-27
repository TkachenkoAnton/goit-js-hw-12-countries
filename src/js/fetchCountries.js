import refs from './refs.js';
import { clearUl, fullRender } from './markup.js';
import { error } from './pnotify.js';

const _ = require('lodash');

refs.formCountryNameInput.value = '';

const searchQuery = _.debounce(() => {
  fetchCountries(refs.formCountryNameInput.value);
}, 500);

function fetchCountries(searchQuery) {
  if (searchQuery === '') {
    clearUl();
    return;
  }
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
      return response.json();
    })
    .then(data =>
      data.filter(country =>
        country.name
          .toLowerCase()
          .includes(refs.formCountryNameInput.value.toLowerCase()),
      ),
    )
    .then(countriesArray => fullRender(countriesArray))
    .catch(() => {
      error({
        title: 'Sorry',
        text: 'Country does not exist!',
      });
    });
}

refs.formCountryNameInput.addEventListener('input', searchQuery);
refs.formCountryName.addEventListener('submit', e => e.preventDefault());
