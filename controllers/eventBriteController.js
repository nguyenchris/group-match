const axios = require('axios');
const { getSuggestions } = require('../utils/utility');
const querystring = require('querystring');

const { parseEventData } = require('../utils/utility');

const devEvents = require('../data/eventsJSON-dev.json');
const db = require('../models/index');

// Controller for GET /api/event/city?{query=}
exports.getLocationAutocomplete = (req, res, next) => {
  res
    .status(200)
    .json({ locations: getSuggestions(decodeURI(req.query.location), 'location', 'city') });
};

// Controller for GET /api/event/search?{query=}
exports.getEventSearch = (req, res, next) => {
  const authHeader = { headers: { Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}` } };
  console.log(req.query);
  let apiQuery = querystring.stringify(req.query);
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
      res.status(200).json({ pagination: pagination, events: updatedEvents });
    })
    .catch(err => {
      console.log(err.data);
      next(err);
    });
};

// controller for POST /api/event
exports.postCreateEvent = (req, res, next) => {
  const { name, description, maxAttendees, preference, eventData } = req.body;
  const meetup = new db.Meetup({
    name: name,
    description: description,
    preference: preference,
    creator: req.userId,
    maxAttendees: maxAttendees,
    event: eventData
  });
  return meetup
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

// Gets all meetup data from DB
exports.getMeetups = (req, res, next) => {
  db.Meetup.find()
    .then(meetups => {
      res.json({ meetups: meetups });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

exports.joinMeetup = (req, res, next) => {
  db.Meetup.findOne({
    _id: req.body.meetupId
  })
    .then(fetchedMeetup => {
      let max = fetchedMeetup.attendees.length;
      const isUserJoined = fetchedMeetup.attendees.some(
        attendee => attendee._id.toString() === req.userId
      );
      if (max >= parseInt(fetchedMeetup.maxAttendees)) {
        return res.status(400).json({ error: 'Too Many attendees' });
      }
      if (isUserJoined) {
        fetchedMeetup.attendees.pull(req.userId);
        return fetchedMeetup.save();
      } else {
        fetchedMeetup.attendees.push(req.userId);
        return fetchedMeetup.save();
      }
    })
    .then(meetup => {
      return db.Meetup.findOne({ _id: meetup._id });
    })
    .then(updatedMeetup => {
      res.status(201).json({ meetup: updatedMeetup });
    });
};

// DEV ONLY
// GET controller to get the same json of events as if a user searches for events
exports.devOnlyGetEvents = (req, res, next) => {
  res.json({ events: devEvents });
};
