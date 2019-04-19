const axios = require('axios');
const { getSuggestions } = require('../utils/utility');

// controller for /api/event/search?{query=}
exports.getCityAutocomplete = (req, res, next) => {
  if (req.query.location) {
    res.json({ locations: getSuggestions(decodeURI(req.query.location), 'location', 'city') });
  }
};
