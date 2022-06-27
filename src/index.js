import './css/styles.css';
import Notiflix from 'notiflix'
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputFeild = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


function fetchCountries(evt) {
    if (evt.target.value) {
        const name = evt.target.value;
        fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        return response.json();
    }).then(createCountryMarcup).catch
    }
};

function createCountryMarcup(countries) {
    if (countries.length >= 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return
    }else if (countries.length > 1) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        countryList.insertAdjacentHTML("beforeend", countriesListTpl(countries));
    } else {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        countryInfo.insertAdjacentHTML("beforeend", countryInfoTpl(countries));
    }
};

function countryInfoTpl(countries) {
    const marcup = countries.map((country) => {
     return `<img src="${country.flags.svg}" width="30">
            <hi>${country.name.common}</h1>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Population: ${Object.values(country.languages)}</p>` 
    }).join("");
    return marcup;
    // const marcup = `<img src="${country.flags.svg}" width="30">
    //     <hi>${country.name.common}</h1>
    //     <p>Capital: ${country.capital}</p>
    //     <p>Population: ${country.population}</p>
    //     <p>Population: ${country.languages.value}</p>`
    // return marcup;
};

function countriesListTpl(countries) {
    const marcup = countries.map((country) => {
     return `<li>
        <img src="${country.flags.svg}" width="30">
        <p>${country.name.common}</p>
        </li>` 
    }).join("");
    return marcup;
};

inputFeild.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

