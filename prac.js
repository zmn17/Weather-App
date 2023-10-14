const { time } = require("console");


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

async function main() { 
    try {
        const formatted = await getTimezone('-37.81400000%2C144.96332000');
        console.log(formatted);
    } catch(error) {
        console.error(error);
    }
}

main();