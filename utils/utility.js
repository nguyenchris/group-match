const locations = require('../data/newLocations.json');

// Returns an array of elements that match to the value passed in
exports.getSuggestions = (value, query, prop) => {
  let arrayToFilter;
  if (query === 'location') {
    arrayToFilter = locations;
  } else {
    return;
  }
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : arrayToFilter.filter(
        element => element[prop].toLowerCase().slice(0, inputLength) === inputValue
      );
};
