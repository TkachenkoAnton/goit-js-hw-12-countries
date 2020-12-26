import refs from './refs.js';
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

export { multipleRender, singleRender, clearUl };
