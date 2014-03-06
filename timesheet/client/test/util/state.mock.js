angular.module('ui.router.mock',[])

  .provider("$stateMock", {

    // This is just a noop that returns itself so that modules that register states 
    // in thier config block can complete without error. All state manipulation checking
    // happens within the mock state below. 
    state : function () {
      var State = function () {
        var self = this;
        this.state = function () {
          return self;
        };
      };
      return new State();
    },

    $get: function() {

      var service = {
        expectedTransitions:  [],
        current: {data: {}},
      
        transitionTo : function(stateName, stateParams) {
          $stateParams = angular.copy(stateParams);

          if (this.expectedTransitions.length > 0) {
            var expectedState = this.expectedTransitions.shift();

            if (expectedState.name !== stateName){
              throw Error('Expected transition to state: ' + expectedState.name + ' but transitioned to ' + stateName );
            }

            var expectedParams = expectedState.stateParams;
            if (angular.isDefined(expectedParams) && expectedParams !== stateParams) {
              throw Error('Expected transition with params: ' + JSON.stringify(expectedState.params) + ' but was ' + JSON.stringify(stateParams));
            }

          }
          else {
            throw Error('No more transitions were expected!');
          }

          console.log('Mock transition to: ' + stateName + ', params: ' + JSON.stringify(stateParams));
        },

        go: function (stateName, stateParams) {
          service.transitionTo(stateName, stateParams);
        },

        expectTransitionTo: function (stateName, stateParams) {
          service.expectedTransitions.push({name: stateName, params: stateParams});
        },
        
        ensureAllTransitionsHappened: function(){
          if (service.expectedTransitions.length > 0) {
            throw Error('Not all transitions happened!');
          }
        },

        reload: function () {
          return angular.noop();
        }
      };

      return service;
    }
  })

  .factory('$stateParamsMock', function () {
    return {};
  });