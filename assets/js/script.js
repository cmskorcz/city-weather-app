const WEATHER_API_KEY = 'bc8dee79f60c665335a895eb0f9a0afb'

let searchHistoryEl = document.getElementById('search-history');
let searchInputEl = document.getElementById('search-input');
let searchFormEl = document.getElementById('search-form');

let dateEl = document.getElementById('date');
let tempEl = document.getElementById('temp');
let windEl = document.getElementById('wind');
let humidityEl = document.getElementById('humidity');
let uvEl = document.getElementById('uv');

const displayDate = () => {
    let now = dayjs().format('MM/DD/YYYY');
    dateEl.textContent = now;
}

const getCityGeo = (city) => {
    let apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER_API_KEY}`;

    fetch(apiURL)
        .then((res) => {
            if(res.ok) {
                res.json()
                .then((data) => {
                    let lat = data[0].lat;
                    let lon = data[0].lon;
                    let cityName = data[0].name;
                    getCityWeather(lat, lon, cityName);
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

const getCityWeather = (lat, lon, cityName) => {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`

    fetch(apiUrl)
        .then((res) => {
            if(res.ok) {
                res.json()
                    .then((data) => {
                        displayWeather(data, cityName)
                });
            } else {
                alert('There was an error with finding the weather');
            }
        });
};

const displayWeather = (data, cityName) => {
    let temp = `${data.current.temp} °F`;
    let wind = `${data.current.wind_speed} MPH`;
    let humidity = `${data.current.humidity}%`;
    let uv = data.current.uvi

    let forcast = {
        temperature: temp,
        windSpeed: wind,
        humidity: humidity,
        uvIndex: uv
    }

    let city = cityName

    let cityNameEl = document.getElementById('city-name');
    cityNameEl.textContent = city;

    displayForcast(forcast);
};

const displayForcast = (obj) => {
    tempEl.textContent = obj.temperature;
    windEl.textContent = obj.windSpeed;
    humidityEl.textContent = obj.humidity;
    uvEl.textContent = obj.uvIndex;
};

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

displayDate();
searchFormEl.addEventListener('submit', formSubmitHandler);