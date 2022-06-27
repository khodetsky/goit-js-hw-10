import './css/styles.css';
import Notiflix from 'notiflix'
var debounce = require('lodash.debounce');

import { fetchCountries, } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputFeild = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function onFormTyping(evt) {
    const name = evt.target.value;
    if (evt.target.value) {
    fetchCountries(name.trim()).then(createCountryMarcup).catch(() => {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
    })
    } else if (evt.target.value === "") {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
    }
};

function createCountryMarcup(countries) {
    if (countries.length >= 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.',
        {timeout: 1000});
        return
    } else if (countries.length > 1) {
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
        return `<div class="country-label-box">
                    <img src="${country.flags.svg}" width="50" height="70">
                    <hi class="country-info-header">${country.name.common}</h1>
                </div>
                <ul class="country-info-list">
                    <li class="country-info-text"><span class="text-bold">Capital</span>: ${country.capital}</li>
                    <li class="country-info-text"><span class="text-bold">Population</span>: ${country.population}</li>
                    <li class="country-info-text"><span class="text-bold">Population</span>: ${Object.values(country.languages)}</li>
                </ul>` 
    }).join("");
    return marcup;
};

function countriesListTpl(countries) {
    const marcup = countries.map((country) => {
     return `<li class="country-list-el">
        <img src="${country.flags.svg}" height="30" width="40">
        <p class="country-list-text">${country.name.common}</p>
        </li>` 
    }).join("");
    return marcup;
};

inputFeild.addEventListener('input', debounce(onFormTyping, DEBOUNCE_DELAY));