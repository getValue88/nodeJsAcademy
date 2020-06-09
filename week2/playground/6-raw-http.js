const http = require('http');

const url = `http://api.weatherstack.com/current?access_key=c36b9165b58d4cb2ffbc0d47140a18c0&query=40,-75`;

const request = http.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body);
    });


});


request.on('error', (err) => {
    console.log('Error: ' + err);
});

request.end();

