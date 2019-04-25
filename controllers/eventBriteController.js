const axios = require('axios');
const { getSuggestions } = require('../utils/utility');
const querystring = require('querystring');

// controller for /api/event/search?{query=}
exports.getCityAutocomplete = (req, res, next) => {
  const authHeader = { headers: { Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}` } };
  // if (req.query.location) {
  console.log(req.query.location);
  console.log('first');
  res.json({ locations: getSuggestions(decodeURI(req.query.location), 'location', 'city') });
  // } else {
  //   console.log(req.query);
  //   console.log(querystring.stringify(req.query));
  //   console.log('2nd');
  //   let apiQuery = querystring.stringify(req.query);

  //   if (req.query.hasOwnProperty('location.longitude')) {
  //     apiQuery += '&location.within=18mi';
  //   }
  //   axios
  //     .get(`https://www.eventbriteapi.com/v3/events/search?${apiQuery}`, authHeader)
  //     .then(result => {
  //       res.json(result.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       next(err);
  //     });
  // }
};
