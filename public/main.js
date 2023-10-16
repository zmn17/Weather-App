document.addEventListener('DOMContentLoaded', () => {

    // Search Icon  
    const submit = document.querySelector('.search-label');

    // Input value - 1. Get the input value from submit 
    const input = document.getElementById('search');
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


    submit.addEventListener('click', () => {
        input.style.display = 'block';
    });


    input.addEventListener('keydown', (e) => {
        if(e.key == 'Enter' || e.key == 'Return') {
            e.preventDefault();
            if(input.value !== '') {
                getCurrentWeatherData(input.value);
                input.style.display = 'none';
                input.value = '';
                errorContainer.innerHTML = '';
            } else {
                errorContainer.innerHTML = 'Please enter correct city name!';
            }
        }
    });

    // 2. Once entered, remove the input field
    submit.addEventListener('click', () => {
        if(input.value !== ''){
            getWeatherData(input.value);
            input.style.display = 'none';
            input.value = '';
        }
    });


    async function getCurrentWeatherData(city) {
        const response = await fetch(`/api?q=${city}`);
        let data = await response.json();

        if (data.cod === '404') {
            alert('City not found');
            return;
        }
        city_name.innerHTML = data.name;
        
        // Getting the timezone of the city
        getTimezone('-37.840935', '144.946457');

        // weather status field - img element
        if (data.weather[0].main === 'Clear') {
            weatherIcon.src = '../assets/sun.png';
            weatherIcon.alt = 'clear sky';
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = '../assets/rain.png';
            weatherIcon.alt = 'rain';
        } else if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = '../assets/cloudy.png';
            weatherIcon.alt = 'cloud';
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = '../assets/mist.png';
            weatherIcon.alt = 'mist';
        } else if (data.weather[0].main === 'Snow') {
            weatherIcon.src = '../assets/snow.png';
            weatherIcon.alt = 'snow';
        } else if (data.weather[0].description === 'shower rain') {
            weatherIcon.src = '../assets/shower.png';
            weatherIcon.alt = 'shower rain';
        } else if (data.weather[0].main === 'Thunderstorm') {
            weatherIcon.src = '../assets/thunder.png';
            weatherIcon.alt = 'thunder';
        }
            
        // temperature field
        temperature.innerHTML = Math.floor(data.main.temp - 273.15) + '°C';
        humidity.innerHTML = Math.floor(data.main.humidity) + '%';
        windSpeed.innerHTML = data.wind.speed + 'm/s'; 
            
    }

    async function getTimezone(lat, lng) {
        try {
            const res = await fetch(`/timezone?lat=${lat}&lng=${lng}`);
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

    // INITIAL WEATHER DATA
    getCurrentWeatherData('Melbourne');

});