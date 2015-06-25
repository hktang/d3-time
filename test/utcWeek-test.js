var tape = require("tape"),
    time = require("../"),
    date = require("./date");

require("./dateEqual");

tape("utcWeek.floor(date) returns sundays", function(test) {
  test.dateEqual(time.utcWeek.floor(date.utc(2010, 11, 31, 23, 59, 59)), date.utc(2010, 11, 26));
  test.dateEqual(time.utcWeek.floor(date.utc(2011, 00, 01, 00, 00, 00)), date.utc(2010, 11, 26));
  test.dateEqual(time.utcWeek.floor(date.utc(2011, 00, 01, 00, 00, 01)), date.utc(2010, 11, 26));
  test.dateEqual(time.utcWeek.floor(date.utc(2011, 00, 01, 23, 59, 59)), date.utc(2010, 11, 26));
  test.dateEqual(time.utcWeek.floor(date.utc(2011, 00, 02, 00, 00, 00)), date.utc(2011, 00, 02));
  test.dateEqual(time.utcWeek.floor(date.utc(2011, 00, 02, 00, 00, 01)), date.utc(2011, 00, 02));
  test.end();
});

tape("utcWeek.floor(date) observes the start of daylight savings time", function(test) {
  test.dateEqual(time.utcWeek.floor(date.utc(2011, 02, 13, 01)), date.utc(2011, 02, 13));
  test.end();
});

tape("utcWeek.floor(date) observes the end of the daylight savings time", function(test) {
  test.dateEqual(time.utcWeek.floor(date.utc(2011, 10, 06, 01)), date.utc(2011, 10, 06));
  test.end();
});

tape("utcWeek.floor(date) correctly handles years in the first century", function(test) {
  test.dateEqual(time.utcWeek.floor(date.utc(0011, 10, 06, 07)), date.utc(0011, 10, 01));
  test.end();
});

tape("utcWeek.ceil(date) returns sundays", function(test) {
  test.dateEqual(time.utcWeek.ceil(date.utc(2010, 11, 31, 23, 59, 59)), date.utc(2011, 00, 02));
  test.dateEqual(time.utcWeek.ceil(date.utc(2011, 00, 01, 00, 00, 00)), date.utc(2011, 00, 02));
  test.dateEqual(time.utcWeek.ceil(date.utc(2011, 00, 01, 00, 00, 01)), date.utc(2011, 00, 02));
  test.dateEqual(time.utcWeek.ceil(date.utc(2011, 00, 01, 23, 59, 59)), date.utc(2011, 00, 02));
  test.dateEqual(time.utcWeek.ceil(date.utc(2011, 00, 02, 00, 00, 00)), date.utc(2011, 00, 02));
  test.dateEqual(time.utcWeek.ceil(date.utc(2011, 00, 02, 00, 00, 01)), date.utc(2011, 00, 09));
  test.end();
});

tape("utcWeek.ceil(date) observes the start of daylight savings time", function(test) {
  test.dateEqual(time.utcWeek.ceil(date.utc(2011, 02, 13, 01)), date.utc(2011, 02, 20));
  test.end();
});

tape("utcWeek.ceil(date) observes the end of the daylight savings time", function(test) {
  test.dateEqual(time.utcWeek.ceil(date.utc(2011, 10, 06, 01)), date.utc(2011, 10, 13));
  test.end();
});

tape("utcWeek.offset(date) is an alias for utcWeek.offset(date, 1)", function(test) {
  test.dateEqual(time.utcWeek.offset(date.utc(2010, 11, 31, 23, 59, 59, 999)), date.utc(2011, 00, 07, 23, 59, 59, 999));
  test.end();
});

tape("utcWeek.offset(date, count) does not modify the passed-in date", function(test) {
  var d = date.utc(2010, 11, 31, 23, 59, 59, 999);
  time.utcWeek.offset(d, +1);
  test.dateEqual(d, date.utc(2010, 11, 31, 23, 59, 59, 999));
  test.end();
});

tape("utcWeek.offset(date, count) does not round the passed-in date", function(test) {
  test.dateEqual(time.utcWeek.offset(date.utc(2010, 11, 31, 23, 59, 59, 999), +1), date.utc(2011, 00, 07, 23, 59, 59, 999));
  test.dateEqual(time.utcWeek.offset(date.utc(2010, 11, 31, 23, 59, 59, 456), -2), date.utc(2010, 11, 17, 23, 59, 59, 456));
  test.end();
});

tape("utcWeek.offset(date, count) allows negative offsets", function(test) {
  test.dateEqual(time.utcWeek.offset(date.utc(2010, 11, 01), -1), date.utc(2010, 10, 24));
  test.dateEqual(time.utcWeek.offset(date.utc(2011, 00, 01), -2), date.utc(2010, 11, 18));
  test.dateEqual(time.utcWeek.offset(date.utc(2011, 00, 01), -1), date.utc(2010, 11, 25));
  test.end();
});

tape("utcWeek.offset(date, count) allows positive offsets", function(test) {
  test.dateEqual(time.utcWeek.offset(date.utc(2010, 10, 24), +1), date.utc(2010, 11, 01));
  test.dateEqual(time.utcWeek.offset(date.utc(2010, 11, 18), +2), date.utc(2011, 00, 01));
  test.dateEqual(time.utcWeek.offset(date.utc(2010, 11, 25), +1), date.utc(2011, 00, 01));
  test.end();
});

tape("utcWeek.offset(date, count) allows zero offset", function(test) {
  test.dateEqual(time.utcWeek.offset(date.utc(2010, 11, 31, 23, 59, 59, 999), 0), date.utc(2010, 11, 31, 23, 59, 59, 999));
  test.dateEqual(time.utcWeek.offset(date.utc(2010, 11, 31, 23, 59, 58, 000), 0), date.utc(2010, 11, 31, 23, 59, 58, 000));
  test.end();
});
