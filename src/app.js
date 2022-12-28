const path = require('path');
const express = require('express');
const hbs = require('hbs');

// Utils for the weather
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yasser Haddad',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Yasser Haddad',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Yasser Haddad',
        msg: 'Test Test Test Test'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    const address = req.query.address;

    geocode(address, (error, {
        location,
        longitude,
        latitude
    } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(longitude, latitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                });
            }
            return res.send({
                'forecast': data,
                location,
                address
            });

        });

    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yasser Haddad',
        message: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yasser Haddad',
        message: 'Page Not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000.');
});