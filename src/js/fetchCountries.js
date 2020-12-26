import refs from './refs.js';
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
        countriesArray.map(({ name }) => {
          multipleRender(name);
        });
      } else if (countriesArray.length === 1) {
        countriesArray.map(({ name, capital, population, languages, flag }) => {
          singleRender(name, capital, population, languages, flag);
        });
      }
    });
}

function multipleRender(name) {
  refs.searchResult.insertAdjacentHTML('beforeend', `<li>${name}</li>`);
}

function singleRender(name, capital, population, languages, flag) {
  refs.searchResult.insertAdjacentHTML(
    'beforeend',
    `<li>
        <ul>
          <li>${name}</li>
          <li>${capital}</li>
          <li>${population}</li>
          <li>${languages}</li>
          <li><img src="${flag}" alt="${name}"></li>
        </ul>
      </li>`,
  );
}

function clearUl() {
  if (refs.formCountryNameInput.value === '') {
    refs.searchResult.innerHTML = '';
  }
}

refs.formCountryNameInput.addEventListener('input', searchQuery);
refs.formCountryName.addEventListener('submit', e => e.preventDefault());

export default fetchCountries;
