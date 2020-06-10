const postmanRequest = require('postman-request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmV0b2ZuZHoiLCJhIjoiY2tiODJnZHBlMDA0YzJxcnN0dHpqbGhzcCJ9.xMniPkV31aqTX-CXhWwBoQ`

    postmanRequest({ url: url, json: true }, (err, {body}) => {
        if (err) {
            callback('Unable to connect to geolocation service.', undefined);

        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined);

        } else {
            const city = body.features[0];

            callback(
                undefined,
                {
                    location: city.place_name,
                    latitude: city.center[1],
                    longitude: city.center[0]
                });
        }
    });
}



module.exports = geoCode;