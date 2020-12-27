import refs from './refs.js';
import { success, info } from './pnotify.js';
import markupSingleRender from '../templates/markupSingleRender.hbs';
import markupMultipleRender from '../templates/markupMultipleRender.hbs';

function multipleRender(country) {
  refs.searchResult.insertAdjacentHTML(
    'beforeend',
    markupMultipleRender([...country]),
  );
}

function singleRender(country) {
  refs.searchResult.insertAdjacentHTML(
    'beforeend',
    markupSingleRender([...country]),
  );
}

function clearUl() {
  if (refs.formCountryNameInput.value === '') {
    refs.searchResult.innerHTML = '';
  }
}

function fullRender(countriesArray) {
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
}

export { clearUl, fullRender };
