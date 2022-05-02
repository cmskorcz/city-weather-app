const GEO_API_KEY = '1f6d1a1e5f8971c7d7609741b9cbc241'
const WEATHER_API_KEY = 'bc8dee79f60c665335a895eb0f9a0afb'

let searchHistoryEl = document.getElementById('search-history');
let searchInputEl = document.getElementById('search-input');
let searchFormEl = document.getElementById('search-form');
let weatherContainerEl = document.getElementById('today-weather');


const getCityGeo = (city) => {
    let apiURL = `http://api.positionstack.com/v1/forward?access_key=${GEO_API_KEY}&query=${city}`;

    fetch(apiURL)
        .then((res) => {
            if(res.ok) {
                res.json()
                .then((data) => {
                    getCityWeather(data.data[0].latitude, data.data[0].longitude, data.data[0].name);
                })
            } else {
                alert('There was an error with your search');
            }
        })
        .catch((err) => {
            alert('There was an error with your search');
            console.log(err);
        });
};

const getCityWeather = (lat, long, name) => {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=imperial`

    fetch(apiUrl)
        .then((res) => {
            if(res.ok) {
                res.json()
                    .then((data) => {
                        displayWeather(data, name)
                });
            } else {
                alert('There was an error with finding the weather');
            }
        });
};

const displayWeather = (data, name) => {
    let temp = data.current.temp
    let wind = data.current.wind_speed
    let humidity = data.current.humidity
    let uv = data.current.uvi
    let city = name

    let cityNameEl = document.getElementById('city-name');
    cityNameEl.textContent = city;


}

const formSubmitHandler = (event) => {
    event.preventDefault();
    let city = searchInputEl.value.trim();

    if (city) {
        getCityGeo(city);
        searchInputEl.value = '';
    } else {
        alert('Please enter a city before submitting!');
    };
};

searchFormEl.addEventListener('submit', formSubmitHandler);