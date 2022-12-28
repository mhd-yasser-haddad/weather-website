const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const query = longitude + "," + latitude;
    const url = 'http://api.weatherstack.com/current?access_key=a226f877fc89cd0794b1f0ad83c15ad1&query=' + query + '&units=f';
    request({
        url,
        json: true
    }, (error, {
        body: res
    }) => {
        if (error) {
            callback("Error: unable to connect to weather services.", undefined);
        } else {
            if (res.error) {
                callback(res.error.info, undefined);
            } else {
                const currentWeather = res.current;
                const weatherStatus = "The weather description is: " + currentWeather.weather_descriptions[0] + "\nthe current temp in new york is: " + currentWeather.temperature + "f out,\nit feels like " + currentWeather.feelslike + "f out\n The humidity is: " + currentWeather.humidity;
                callback(undefined, weatherStatus);
            }
        }
    });
}

module.exports = forecast;