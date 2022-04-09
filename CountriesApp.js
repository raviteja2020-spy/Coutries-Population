let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let resultCountriesEl = document.getElementById("resultCountries");

let countriesList = [];
let searchInputVal = "";

function createAndAppendCountries(country) {

    let countryCard = document.createElement("div");
    countryCard.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultCountriesEl.appendChild(countryCard);

    let imageEl = document.createElement("img");
    imageEl.src = country.flag;
    imageEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryCard.appendChild(imageEl);

    let countryBox = document.createElement("div");
    countryBox.classList.add("d-flex", "flex-column", "ml-4");
    countryCard.appendChild(countryBox);

    let countryName = document.createElement("p");
    countryName.classList.add("country-name");
    countryName.textContent = country.name;
    countryBox.appendChild(countryName);

    let countryPopulation = document.createElement("p");
    countryPopulation.classList.add("country-population");
    countryPopulation.textContent = country.population;
    countryBox.appendChild(countryPopulation);
}

function displaySearchResults() {
    for (let country of countriesList) {
        let countryName = country.name;

        if (countryName.toLowerCase().includes(searchInputVal.toLowerCase())) {
            createAndAppendCountries(country);
        }
    }
}

function getCountries() {
    let options = {
        method: "GET",
    };
    let url = "https://apis.ccbp.in/countries-data";

    resultCountriesEl.textContent = "";

    resultCountriesEl.classList.add("d-none");
    spinnerEl.classList.remove("d-none");

    fetch(url, options)
        .then(function(response) {
            resultCountriesEl.classList.remove("d-none");
            spinnerEl.classList.add("d-none");
            return response.json();
        })
        .then(function(jsonData) {
            countriesList = jsonData;
            displaySearchResults();
        });
}

function onChangeSearchInput(event) {
    searchInputVal = event.target.value;
    getCountries();
}

getCountries();
searchInputEl.addEventListener("keyup", onChangeSearchInput);