const GEO_API_KEY = '1f6d1a1e5f8971c7d7609741b9cbc241'

let searchHistoryEl = document.getElementById('search-history');
let searchInputEl = document.getElementById('search-input');
let searchFormEl = document.getElementById('search-form');



const getCityGeo = (city) => {
    let apiURL = `http://api.positionstack.com/v1/forward?access_key=${GEO_API_KEY}&query=${city}`;

    fetch(apiURL)
        .then((res) => {
            if(res.ok) {
                res.json()
                .then((data) => {
                    getCityWeather(data.data[0].latitude, data.data[0].longitude);
                })
            } else {
                alert('There was an error with your search')
            }
        })
        .catch((err) => {
            alert('There was an error with your search');
            console.log(err);
        })
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