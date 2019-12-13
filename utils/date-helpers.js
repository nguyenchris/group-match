const moment = require('moment');

exports.fromNow = date => {
  return moment(date)
    .startOf()
    .fromNow();
};
