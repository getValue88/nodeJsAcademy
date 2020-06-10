const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

//CONFIG

//static files
app.use(express.static(path.join(__dirname, '../public')));

//hbs, views and partials location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));



//ENDPOINTS
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew',
        img: '../img/me.png'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Andrew',
        message: 'This is a help message'
    });
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'something',
        location: 'somewhere'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Andrew',
        message: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Andrew',
        message: 'Page not found.'
    })
});

// SERVER INITIALIZATION
app.listen(3000, () => console.log('app listen on port 3000'));