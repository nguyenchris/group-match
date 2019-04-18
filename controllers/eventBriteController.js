const axios = require('axios');
const { getSuggestions } = require('../utils/utility');
// controller for /api/event/search?q=
exports.getCityAutocomplete = (req, res, next) => {
  res.json({ locations: getSuggestions(decodeURI(req.query.q), 'location', 'city') });
};
