const axios = require('axios');
const fs = require('fs');

const locations = require('../data/locations.json');

const newArray = locations.map(location => {
  return {
    city: location.city,
    state: location.state,
    value: `${location.city}, ${location.state}`,
    label: `${location.city}, ${location.state}`
  };
});

// Write json file consisting of location data for data use in app.
fs.writeFile('locations.json', JSON.stringify(newArray), 'utf8', () => {
  console.log('file created');
});
