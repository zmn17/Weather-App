document.addEventListener('DOMContentLoaded', function() {
    const weatherApiKey = process.env.WEATHER_API_KEY;
    // Search Icon
    const search = document.querySelector('.search-label');

    // Input value - 1. Get the input value from search 
    const searchInput = document.getElementById('search');
    // city name field
    const city_name = document.querySelector('.city-name');
    const date = document.querySelector('.date');
    const weekDay = date.querySelector('.week-day');
    const weatherIcon = document.querySelector('.weather-status');
    const temperature = document.querySelector('.temp');

    // humidity field and wind speed field
    const humidity = document.querySelector('.humidity-lvl');
    const windSpeed = document.querySelector('.wind-speed');

    // Error field
    const errorContainer = document.querySelector('.error');
    errorContainer.innerHTML = '';

    // DEFAULT WEATHER DATA OF MELBOURNE START
    
    // call api for melbourne
    const melbrnData = `http://api.openweathermap.org/data/2.5/weather?lat=-37.840935&lon=144.946457&appid=${weatherApiKey}`;
    fetch(melbrnData)
        .then(res => res.json())
        .then(data => {
            city_name.innerHTML = data.name;
            
            // weather status field - img element
            if (data.weather[0].main === 'Clear') {
                weatherIcon.src = 'assets/sun.png';
                weatherIcon.alt = 'clear sky';
            } else if (data.weather[0].main === 'Rain') {
                weatherIcon.src = 'assets/rain.png';
                weatherIcon.alt = 'rain';
            } else if (data.weather[0].main === 'Clouds') {
                weatherIcon.src = 'assets/cloudy.png';
                weatherIcon.alt = 'cloud';
            } else if (data.weather[0].main === 'Mist') {
                weatherIcon.src = 'assets/mist.png';
                weatherIcon.alt = 'mist';
            } else if (data.weather[0].main === 'Snow') {
                weatherIcon.src = 'assets/snow.png';
                weatherIcon.alt = 'snow';
            } else if (data.weather[0].description === 'shower rain') {
                weatherIcon.src = 'assets/shower.png';
                weatherIcon.alt = 'shower rain';
            } else if (data.weather[0].main === 'Thunderstorm') {
                weatherIcon.src = 'assets/thunder.png';
                weatherIcon.alt = 'thunder';
            }

            temperature.innerHTML = Math.floor(data.main.temp - 273.15) + '°C';
            humidity.innerHTML = Math.floor(data.main.humidity) + '%';
            windSpeed.innerHTML = data.wind.speed + 'm/s';
        });
    const melbrnDate = new Date();
    const formatOps = {
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };
    const formatted = melbrnDate.toLocaleString('en-US', formatOps);
    date.innerHTML = formatted;

    // DEFAULT VALUES FOR MELBOURNE WEATHER END 



    search.addEventListener('click', () => {
        searchInput.style.display = 'block';
    });


    searchInput.addEventListener('keydown', (e) => {
        if(e.key == 'Enter' || e.key == 'Return') {
            e.preventDefault();
            if(searchInput.value !== '') {
                getCurrentWeatherData(searchInput);
                searchInput.style.display = 'none';
                searchInput.value = '';
                errorContainer.innerHTML = '';
            } else {
                errorContainer.innerHTML = 'Please enter correct city name!';
            }
        }
    });

    // 2. Once entered, remove the input field
    search.addEventListener('click', () => {
        if(searchInput.value !== ''){
            getWeatherData(searchInput.value);
            searchInput.style.display = 'none';
            searchInput.value = '';
        }
    });

    async function getCurrentWeatherData(city) {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${weatherApiKey}`);
        let data = await response.json();
        
        city_name.innerHTML = data.name;
            
            // Getting the timezone of the city
            getTimezone(data.coord.lat, data.coord.lon);
    
            // weather status field - img element
            if (data.weather[0].main === 'Clear') {
                weatherIcon.src = 'assets/sun.png';
                weatherIcon.alt = 'clear sky';
            } else if (data.weather[0].main === 'Rain') {
                weatherIcon.src = 'assets/rain.png';
                weatherIcon.alt = 'rain';
            } else if (data.weather[0].main === 'Clouds') {
                weatherIcon.src = 'assets/cloudy.png';
                weatherIcon.alt = 'cloud';
            } else if (data.weather[0].main === 'Mist') {
                weatherIcon.src = 'assets/mist.png';
                weatherIcon.alt = 'mist';
            } else if (data.weather[0].main === 'Snow') {
                weatherIcon.src = 'assets/snow.png';
                weatherIcon.alt = 'snow';
            } else if (data.weather[0].description === 'shower rain') {
                weatherIcon.src = 'assets/shower.png';
                weatherIcon.alt = 'shower rain';
            } else if (data.weather[0].main === 'Thunderstorm') {
                weatherIcon.src = 'assets/thunder.png';
                weatherIcon.alt = 'thunder';
            }
                
            // temperature field
            temperature.innerHTML = Math.floor(data.main.temp - 273.15) + '°C';
            humidity.innerHTML = Math.floor(data.main.humidity) + '%';
            windSpeed.innerHTML = data.wind.speed + 'm/s'; 
            
    }

    async function getTimezone(lat, lng) {
        const timezoneApiKey = process.env.TIMEZONE_API_KEY;
        const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timezoneApiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            
            if(data.status === 'OK') {
                // Format the time as 'MON 11AM'
                const rawDate = new Date(data.formatted);
                const options = {
                    weekday: 'short',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                };
                const newDate = rawDate.toLocaleDateString('en-US', options);
                date.innerHTML = newDate;
            } else {
                throw new Error('Time zone data not available');
            }
        } catch(err) {
            throw new Error('Error fetching time zone data: ' + err.message);
        }
    }
    
});
