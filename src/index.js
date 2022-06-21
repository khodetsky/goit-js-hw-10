import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputFeild = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list')

// fetch(`https://restcountries.com/v3.1/name/por?fields=name.official,capital,population,flags,languages`)
//     .then(response => {
//         return response.json();
//     })
//     .then(country => {
//         console.log(country)
//     });


function fetchCountries(evt) {
    const name = evt.currentTarget.value;
        fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        return response.json();
    }).then(countries => {

        const marcup = countries.map((country) => {
            `<li>
            <img href="${country.flags.svg}">
            <p>${country.name.official}</p>
            </li>`
        }).join("");

        countryList.insertAdjacentHTML("beforeend", marcup)
        // createCountryMarcup(countries);
        // console.log(countriesTpl(countries));
        console.log(countries)
    });
};




function createCountryMarcup(countries) {
    countryList.insertAdjacentHTML("beforeend", countriesTpl(countries))
};

function countriesTpl(countries) {
    const marcup = countries.map((country) => {
        `<li>
        <img href="${country.flags.svg}">
        <p>${country.name.official}</p>
        </li>`
    }).join("");
    return marcup;
};

inputFeild.addEventListener('input', fetchCountries)
