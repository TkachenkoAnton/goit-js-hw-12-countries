import refs from './refs.js';
import { multipleRender, singleRender, clearUl } from './markup.js';
import * as PNotify from '@pnotify/core/dist/PNotify.js';
// import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

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
        PNotify.success({
          title: 'Success!',
          text: 'Look at the countries on your request',
        });
      } else if (countriesArray.length === 1) {
        refs.searchResult.innerHTML = '';
        countriesArray.map(country => {
          singleRender(country);
        });
        PNotify.success({
          title: 'Success!',
          text: 'Country info loaded',
        });
      } else if (countriesArray.length > 10) {
        PNotify.info({
          text: 'Too many matches found. Please enter a more specific query!',
          hide: true,
        });
      }
    })
    .catch(function () {
      PNotify.error({
        title: 'Sorry',
        text: 'Country does not exist!',
      });
    });
}

refs.formCountryNameInput.addEventListener('input', searchQuery);
refs.formCountryName.addEventListener('submit', e => e.preventDefault());
