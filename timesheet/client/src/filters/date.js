angular.module('date.filters', [
  'app.values',
  'date.utils.services'
])

  // http://momentjs.com/docs/#/displaying/fromnow/
  .filter('momentFromNowAgo', function (apiDateFormat, dateUtils) {
    return function (dateString) {
      var momentDate = moment(dateString, apiDateFormat);
      return dateUtils.nullOrUndefined(dateString) || (momentDate.isValid() ? momentDate.fromNow() : 'Invalid date');
    };
  })

  // http://momentjs.com/docs/#/displaying/calendar-time/
  .filter('momentCalendar', function (apiDateFormat, dateUtils) {
    return function (dateString) {
      return dateUtils.nullOrUndefined(dateString) || moment(dateString, apiDateFormat).calendar();
    };
  })

  // Nov 18, 2013
  .filter('momentShortDate', function (apiDateFormat, dateUtils) {
    return function (dateString) {
      return dateUtils.nullOrUndefined(dateString) || moment(dateString, apiDateFormat).format("MMM D, YYYY");
    };
  })

  // November 18th, 2013
  .filter('momentLongDate', function (apiDateFormat, dateUtils) {
    return function (dateString) {
      return dateUtils.nullOrUndefined(dateString) || moment(dateString, apiDateFormat).format("MMMM Do, YYYY");
    };
  });
