const axios = require('axios');
const { getSuggestions } = require('../utils/utility');
const querystring = require('querystring');
const moment = require('moment-timezone');
const { parseEventData } = require('../utils/utility');

// Controller for /api/event/city?{query=}
exports.getLocationAutocomplete = (req, res, next) => {
  res.json({ locations: getSuggestions(decodeURI(req.query.location), 'location', 'city') });
};

// Controller for /api/event/search?{query=}
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
      `https://www.eventbriteapi.com/v3/events/search?${apiQuery}&expand=organizer,venue,format,category&include_adult_events=true`,
      authHeader
    )
    .then(result => {
      const { pagination, events } = result.data;
      const updatedEvents = parseEventData(events);
      let numberOfEvents = null;

      // const currentPageNumberOfEvents = result.data.pagination.
      // if (pagination.object_count <= 50) {
      //   numberOfEvents = updatedEvents.length
      // } else {

      // }
      // if (updatedNumOfEvents !== numberOfEvents)
      res.json({ pagination: pagination, events: updatedEvents });
      // res.json(result.data);
    })
    .catch(err => {
      console.log(err);
      console.log(err.data);
      next(err);
    });
};
