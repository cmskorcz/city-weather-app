let searchHistoryEl = document.getElementById('search-history');
let searchInputEl = document.getElementById('search-input');
let searchFormEl = document.getElementById('search-form');

const getCityWeather = (city) => {
    // let apiUrl = 
}

const formSubmitHandler = (event) => {
    event.preventDefault();
    let city = searchInputEl.value.trim();

    if (city) {
        getCityWeather(city);
        searchInputEl.value = '';
    } else {
        alert('Please enter a city before submitting!');
    };
};

searchFormEl.addEventListener('submit', displaySearchHistory);