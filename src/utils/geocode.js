const request = require('request');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFzc2VyLWhhZGRhZCIsImEiOiJja203bmdlcngwemkzMnVzM256NXBvbjhxIn0.Py1z7sk2WYMw8pO6qlP8XQ&limit=1';
    request({
        url,
        json: true
    }, (error, {body: res}) => {
        if (error) {
            callback("Error: unable to connect to location services.", undefined);
        } else {
            if (res.features.length == 0) {
                callback("No search results for the entered country.", undefined);
            } else {
                const feature = res.features[0];
                callback(undefined, {
                    longitude: feature.center[0],
                    latitude: feature.center[1],
                    location: feature.place_name
                });
                // console.log("longitude: " + feature.center[0] + "\n latitude: " + feature.center[1]);
            }
        }
    });
}

module.exports = geocode;