document.addEventListener('DOMContentLoaded', function() {
    // Search Icon
    const search = document.querySelector('.search-label');

    // Input value - 1. Get the input value from search 
    const searchInput = document.getElementById('search');

    search.addEventListener('click', () => {
        searchInput.style.display = 'block';
    });



    // 3. Get the input -> data from API ---> update the
    //    'city-name' field
    //    'date': to date.now -> formate:  DAY/TIME AM/PM
    // 4. 'weather-status': update the weather status image based on weather status
    // 5. Update the c.degree value of 'temp' field.
    // 6. Create a div called 'weekly-data'
    //    inside this div: 'day' 'status' 'day-temp'


    searchInput.addEventListener('keydown', (e) => {
        if(e.key == 'Enter' || e.key == 'Return') {
            e.preventDefault();
            getWeatherData(searchInput);
        }
    });

    // 2. Once entered, remove the input field
    search.addEventListener('click', () => {
        if(searchInput.value !== ''){
            getWeatherData(searchInput);
            searchInput.style.display = 'none';
            searchInput.value = '';
        }
    });

    async function getWeatherData(city) {
        const apiKey = '82192cd41da5bac0a2640aff81a620e0';
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`);
        let data = await response.json();
        
        console.log(data);
        // city name field
        document.querySelector('.city-name').innerHTML = data.name;
        
        // Getting the timezone of the city
        const date = document.querySelector('.date');
        const dateTime = getTimezone(data.coord.lon, data.coord.lat);
        date.innerHTML = dateTime;    

        // weather status field - img element
        const weatherIcon = document.querySelector('.weather-status');
        if (data.weather[0].main === 'Clear') {
            weatherIcon.src = 'assets/sun.png';
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = 'assets/rain.png';
        } else if (data.weather[0].main === 'Cloud') {
            weatherIcon.src = 'assets/windy.png';
        }
        

        // temperature field
        const temperature = document.querySelector('.temp').innerHTML = Math.floor(data.main.temp - 273.15) + '°C';
        
        // weekdays-temp container
        const weekdays = document.querySelector('.weekdays-temp');
        const weeklyData = document.querySelector('.weekly-data');
        const day = document.querySelector('.day');
        const status = document.querySelector('.status');
        const dayTemp = document.querySelector('.day-temp');

    }

    async function getTimezone(location) {
        const apiKey = 'AIzaSyDYu0TIOT9S06VT1GUTGiybvhkPHdgu7ns';
        const timestamp = Math.floor(Date.now() / 1000);
    
        const apiUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${location}&timestamp=${timestamp}&key=${apiKey}`
        const res = await fetch(apiUrl);
        let data = await res.json();
    
        try {
            const res = await fetch(apiUrl);
            const data = await res.json();
    
            console.log(data);
    
            if(data.status === 'ok') {
                const timeZoneId = data.timeZoneId;
                const currentTime = new Date().toLocaleString('en-US', { timeZone: timeZoneId });
        
                // Format the time as 'MON 11AM'
                const options = {
                    weekday: 'short',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                };
                const formattedTime = new Date(currentTime).toLocaleString('en-US', options);
                return formattedTime;
    
            } else {
                throw new Error('Time zone data not available');
            }
        } catch(err) {
            throw new Error('Error fetching time zone data: ' + err.message);
        }
        
    
    }



});


