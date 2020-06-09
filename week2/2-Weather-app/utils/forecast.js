const postmanRequest = require('postman-request');

const foreCast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c36b9165b58d4cb2ffbc0d47140a18c0&query=${latitude},${longitude}`;

    postmanRequest({ url: url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service', undefined);

        } else if (body.error) {
            callback('Unable to find location.', undefined);

        } else {
            const { current } = body;
            callback(
                undefined,
                `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees. It feels like ${current.feelslike} degrees out. There is a ${current.precip}% chance of rain.`
            );
        }
    });
};



module.exports = foreCast;