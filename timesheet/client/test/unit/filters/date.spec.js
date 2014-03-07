describe('Date filters:', function () {
  var expect = chai.expect,
    apiDateFormat;

  beforeEach(module('date.filters'));

  beforeEach(inject(function($injector) {
    apiDateFormat = $injector.get('apiDateFormat');
  }));

  describe('momentFromNowAgo', function() {
    var momentFromNowAgoFilter;

    beforeEach(inject(function($injector) {
      momentFromNowAgoFilter = $injector.get('momentFromNowAgoFilter');
    }));

    it('should display "a month ago" for a date at least 25 days ago', function() {
      expect(momentFromNowAgoFilter(moment().subtract('days', 25).format())).to.equal('a month ago');
    });

    it('should display "a year ago" for a date at least 345 days ago', function() {
      expect(momentFromNowAgoFilter(moment().subtract('days', 345).format())).to.equal('a year ago');
    });

    it('should display "None" for a null date', function() {
      expect(momentFromNowAgoFilter(null)).to.equal('None');
    });

    it('should display "None" for a undefined date', function() {
      expect(momentFromNowAgoFilter(undefined)).to.equal('None');
    });

    it('should display "Invalid date" for an invalid date', function() {
      expect(momentFromNowAgoFilter("not a date")).to.equal('Invalid date');
    });

  });

  describe('momentCalendar', function () {
    var momentCalendarFilter;

    beforeEach(inject(function($injector) {
      momentCalendarFilter = $injector.get('momentCalendarFilter');
    }));

    it('should display "Nov 15, 2010" for 2010-11-15', function() {
      expect(momentCalendarFilter("2010-11-15")).to.equal('11/15/2010');
    });

    it('should display "Jan 30, 2013" for 2013-01-30', function() {
      expect(momentCalendarFilter("2013-01-30")).to.equal('01/30/2013');
    });

    it('should display "None" for a null date', function() {
      expect(momentCalendarFilter(null)).to.equal('None');
    });

    it('should display "None" for a undefined date', function() {
      expect(momentCalendarFilter(undefined)).to.equal('None');
    });

    it('should display "Invalid date" for an invalid date', function() {
      expect(momentCalendarFilter("not a date")).to.equal('Invalid date');
    });

  });

  describe('momentShortDate', function () {
    var momentShortDateFilter;

    beforeEach(inject(function($injector) {
      momentShortDateFilter = $injector.get('momentShortDateFilter');
    }));

    it('should display "Nov 15, 2010" for 2010-11-15', function() {
      expect(momentShortDateFilter("2010-11-15")).to.equal('Nov 15, 2010');
    });

    it('should display "Jan 30, 2013" for 2013-01-30', function() {
      expect(momentShortDateFilter("2013-01-30")).to.equal('Jan 30, 2013');
    });

    it('should display "None" for a null date', function() {
      expect(momentShortDateFilter(null)).to.equal('None');
    });

    it('should display "None" for a undefined date', function() {
      expect(momentShortDateFilter(undefined)).to.equal('None');
    });

    it('should display "Invalid date" for an invalid date', function() {
      expect(momentShortDateFilter("not a date")).to.equal('Invalid date');
    });
  });

  describe('momentLongDate', function () {
    var momentLongDateFilter;

    beforeEach(inject(function($injector) {
      momentLongDateFilter = $injector.get('momentLongDateFilter');
    }));

    it('should display "November 15th, 2010" for 2010-11-15', function() {
      expect(momentLongDateFilter("2010-11-15")).to.equal('November 15th, 2010');
    });

    it('should display "January 30th, 2013" for 2013-01-30', function() {
      expect(momentLongDateFilter("2013-01-30")).to.equal('January 30th, 2013');
    });

    it('should display "None" for a null date', function() {
      expect(momentLongDateFilter(null)).to.equal('None');
    });

    it('should display "None" for a undefined date', function() {
      expect(momentLongDateFilter(undefined)).to.equal('None');
    });

    it('should display "Invalid date" for an invalid date', function() {
      expect(momentLongDateFilter("not a date")).to.equal('Invalid date');
    });
  });

});