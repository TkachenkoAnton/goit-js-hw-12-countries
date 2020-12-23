function fetchCountries(searchQuery) {
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
}

export default fetchCountries;
