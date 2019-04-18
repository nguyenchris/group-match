const locations = require('../data/locations.json');

// Returns an array of all the cities and states array depending on what string value is passed in
exports.getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : locations.filter(loc => loc.city.toLowerCase().slice(0, inputLength) === inputValue);
};
