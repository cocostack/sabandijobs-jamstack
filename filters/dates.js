const { DateTime } = require("luxon");

/*
  A date formatter filter for Nunjucks
*/
module.exports = function(date) {
    return DateTime.fromJSDate(date, {
      zone: "utc",
    }).toFormat("d/M/y");;
}
