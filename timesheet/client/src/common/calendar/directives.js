(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering calendar.directives");

  angular.module('common.calendar.directives', [])
    .directive('calendar', ['$compile', function ($compile) {

      var monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
      var days = ['s', 'm', 't', 'w', 't', 'f', 's'];

      var isLeapYear = function (year) {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
      };

      var daysInMonth = function (date) {
        return [31, (isLeapYear(date.getYear()) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][date.getMonth()];
      };

      var formatDateHeading = function (date) {
        var m = monthNames[date.getMonth()];
        return m.charAt(0).toUpperCase() + m.slice(1) + ' ' + date.getFullYear();
      };

      var currentDate = new Date();

      function getTemplate(month, year, dates) {

        month = ((isNaN(month) || month === null) ? currentDate.getMonth() + 1 : month) - 1;
        year = (isNaN(year) || year === null) ? currentDate.getFullYear() : year;

        var firstDay = new Date(year, month, 1),
          startDay = firstDay.getDay(),
          monthLength = daysInMonth(firstDay),
          heading = formatDateHeading(firstDay);

        if (!dates || !dates.length) dates = [currentDate.getDate()];

        var tpl = [
          '<div class="cal">',
          '<table class="cal">',
          '<tr><th colspan="7">' + heading + '</th></tr>',
          '<tr>'];

        days.forEach(function (day) {
          tpl.push('<td class="cal-head">' + day.toUpperCase() + '</td>');
        });
        tpl.push('</tr>');

        var day = 1,
          rows = Math.ceil((monthLength + startDay) / 7);

        for (var i = 0; i < rows; i++) {
          var row = ['<tr>'];
          for (var j = 0; j < 7; j++) {
            row.push('<td>');
            if (day <= monthLength && (i > 0 || j >= startDay)) {
              if (dates.indexOf(day) != -1) row.push('<div class="cal-day cal-highlight" data-cal="' + year + '/' + month + '/' + day + '">');
              if (dates.indexOf(day) == -1) row.push('<div class="cal-day" data-cal="' + year + '/' + month + '/' + day + '">');
              row.push(day + '</div>');
              day++;
            }
            row.push('</td>');
          }
          row.push('</tr>');
          tpl.push(row.join(''));
        }
        tpl.push('</table></div>');

        return tpl.join('');
      }

      return {
        restrict: 'A',
        replace: true,
        link: function ($scope, $element, attrs) {
          $element.html(getTemplate(parseInt(attrs.month, 10), parseInt(attrs.year, 10), []));
          $compile($element.contents());
        }
      };
    }]);

}());