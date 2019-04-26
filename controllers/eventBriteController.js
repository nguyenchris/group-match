const axios = require('axios');
const { getSuggestions } = require('../utils/utility');
const querystring = require('querystring');
const moment = require('moment-timezone');
const { parseEventData } = require('../utils/utility');

// controller for /api/event/search?{query=}
exports.getLocationAutocomplete = (req, res, next) => {
  res.json({ locations: getSuggestions(decodeURI(req.query.location), 'location', 'city') });
};

exports.getEventSearch = (req, res, next) => {
  const authHeader = { headers: { Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}` } };
  console.log(req.query);
  let apiQuery = querystring.stringify(req.query);
  // if (req.query.hasOwnProperty('location.longitude')) {
  //   apiQuery += '&location.within=18mi';
  // }
  console.log(apiQuery);
  // THINGS TO INCLUDE INTO REQUEST URL
  // SORT BY, PRICE, 21+
  axios
    .get(
      `https://www.eventbriteapi.com/v3/events/search?${apiQuery}&include_all_series_instances=false&expand=organizer,venue,format,category`,
      authHeader
    )
    .then(result => {
      const events = parseEventData(result.data.events);
      res.json({ pagination: result.data.pagination, events: events });
    })
    .catch(err => {
      console.log(err);
      console.log(err.data);
      next(err);
    });
};
