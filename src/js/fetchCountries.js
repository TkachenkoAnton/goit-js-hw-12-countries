import refs from './refs.js';
import { multipleRender, singleRender, clearUl } from './markup.js';
import { error, success, info } from './pnotify';

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
    .then(countriesArray => {
      if (countriesArray.length > 1 && countriesArray.length <= 10) {
        refs.searchResult.innerHTML = '';
        countriesArray.map(country => {
          multipleRender(country);
        });
        success({
          title: 'Success!',
          text: 'Look at the countries on your request',
        });
      } else if (countriesArray.length === 1) {
        refs.searchResult.innerHTML = '';
        countriesArray.map(country => {
          singleRender(country);
        });
        success({
          title: 'Success!',
          text: 'Country info loaded',
        });
      } else if (countriesArray.length > 10) {
        info({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      }
    })
    .catch(function () {
      error({
        title: 'Sorry',
        text: 'Country does not exist!',
      });
    });
}

refs.formCountryNameInput.addEventListener('input', searchQuery);
refs.formCountryName.addEventListener('submit', e => e.preventDefault());
