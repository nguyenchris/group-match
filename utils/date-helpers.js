const moment = require('moment');
let date = '2019-04-14 06:18:58.939';
// console.log(moment(date).format('MM-DD-YYYY hh:mm:ss'));
// console.log(
//   moment(date)
//     .startOf()
//     .fromNow()
// );

exports.fromNow = date => {
  moment(date)
    .startOf()
    .fromNow();
};
