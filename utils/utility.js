const locations = require('../data/newLocations.json');
const moment = require('moment-timezone');

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

// converts the eventbrite JSON data and returns a custom array of objects
// exports.parseEventData = data => {
//   return data.map(event => {
//     if (event.logo) {
//       const {
//         id,
//         is_free,
//         name,
//         start,
//         end,
//         summary,
//         url,
//         logo,
//         category,
//         organizer,
//         description,
//         venue,
//         format
//       } = event;
//       const eventData = {
//         id: id,
//         isFree: is_free,
//         name: name.text,
//         hdImage: logo.original.url,
//         lowImage: logo.url,
//         url: url,
//         description: description,
//         summary: summary,
//         start: {
//           time: start.local,
//           timeDisplay: moment(start.local)
//             .tz(start.timezone)
//             .format('ddd, MMM D, h:mma z'),
//           timeFormatted: moment(start.local)
//             .tz(start.timezone)
//             .format('h:mma z'),
//           timezone: start.timezone,
//           date: moment(start.local)
//             .tz(start.timezone)
//             .format('ddd, MMM D')
//         },
//         end: {
//           time: end.local,
//           timeDisplay: moment(end.local)
//             .tz(end.timezone)
//             .format('ddd, MMM D, h:mma z'),
//           timeFormatted: moment(end.local)
//             .tz(end.timezone)
//             .format('h:mma z'),
//           timezone: end.timezone,
//           date: moment(end.local)
//             .tz(end.timezone)
//             .format('ddd, MMM D')
//         },
//         category: category,
//         organizer: {
//           name: organizer.name,
//           url: organizer.url
//         },
//         venue: venue,
//         format: format
//       };
//       return eventData;
//     }
//   });
// };
// converts the eventbrite JSON data and returns a custom array of objects
exports.parseEventData = data => {
  return data.reduce((eventArray, event) => {
    if (event) {
      const {
        id,
        is_free,
        name,
        start,
        end,
        summary,
        url,
        logo,
        category,
        organizer,
        description,
        venue,
        format
      } = event;
      if (category && organizer && description && venue && format && logo) {
        if (venue.longitude && venue.latitude && logo.url && logo.original.url) {
          const eventData = {
            id: id,
            isFree: is_free,
            name: name.text,
            hdImage: logo.original.url,
            lowImage: logo.url,
            url: url,
            description: description,
            summary: summary,
            start: {
              time: start.local,
              timeDisplay: moment(start.local)
                .tz(start.timezone)
                .format('ddd, MMM D, h:mma z'),
              timeFormatted: moment(start.local)
                .tz(start.timezone)
                .format('h:mma z'),
              timezone: start.timezone,
              date: moment(start.local)
                .tz(start.timezone)
                .format('ddd, MMM D')
            },
            end: {
              time: end.local,
              timeDisplay: moment(end.local)
                .tz(end.timezone)
                .format('ddd, MMM D, h:mma z'),
              timeFormatted: moment(end.local)
                .tz(end.timezone)
                .format('h:mma z'),
              timezone: end.timezone,
              date: moment(end.local)
                .tz(end.timezone)
                .format('ddd, MMM D')
            },
            category: category,
            organizer: organizer,
            venue: venue,
            format: format
          };
          eventArray.push(eventData);
        }
      }
    }
    return eventArray;
  }, []);
};
