
/*  
    WEBSTACK api key
    c36b9165b58d4cb2ffbc0d47140a18c0

    MAPBOX token
    pk.eyJ1IjoiYmV0b2ZuZHoiLCJhIjoiY2tiODJnZHBlMDA0YzJxcnN0dHpqbGhzcCJ9.xMniPkV31aqTX-CXhWwBoQ
*/

const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const location = process.argv[2];

if (location) {
    geoCode(location, (err, { latitude, longitude, location } = {}) => {
        if (err)
            return console.log(err);


        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
                return console.log(error);

            console.log(location);
            console.log(forecastData)
        });
    });

} else {
    console.log('Please provide a location.');
}

