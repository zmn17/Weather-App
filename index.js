const search = document.querySelector('.search-label');
search.addEventListener('click', () => {
    const searchInput = document.getElementById('search');
    searchInput.style.display = 'block';
    if(searchInput.value != '') {
        searchInput.style.display = 'none';
    }
});


const apiKey = '82192cd41da5bac0a2640aff81a620e0';
const city = 'Melbourne';


// 1. Get the input value from search
// 2. Once entered, remove the input field
// 3. Get the input -> data from API ---> update the
//    'city-name' field
//    'date': to date.now -> formate:  DAY/TIME AM/PM
// 4. 'weather-status': update the weather status image based on weather status
// 5. Update the c.degree value of 'temp' field.
// 6. Create a div called 'weekly-data'
//    inside this div: 'day' 'status' 'day-temp'
