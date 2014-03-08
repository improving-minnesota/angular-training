angular.module('date.filters', [
  'date.utils.services'
])

  // http://momentjs.com/docs/#/displaying/fromnow/
  .filter('momentFromNowAgo', function (dateUtils) {
    return function (dateString) {
      var momentDate = moment(dateString);
      return dateUtils.nullOrUndefined(dateString) || (momentDate.isValid() ? momentDate.fromNow() : 'Invalid date');
    };
  })

  // http://momentjs.com/docs/#/displaying/calendar-time/
  .filter('momentCalendar', function (dateUtils) {
    return function (dateString) {
      return dateUtils.nullOrUndefined(dateString) || moment(dateString).calendar();
    };
  })

  // Nov 18, 2013
  .filter('momentShortDate', function (dateUtils) {
    return function (dateString) {
      return dateUtils.nullOrUndefined(dateString) || moment(dateString).format("MMM D, YYYY");
    };
  })

  // November 18th, 2013
  .filter('momentLongDate', function (dateUtils) {
    return function (dateString) {
      return dateUtils.nullOrUndefined(dateString) || moment(dateString).format("MMMM Do, YYYY");
    };
  });
