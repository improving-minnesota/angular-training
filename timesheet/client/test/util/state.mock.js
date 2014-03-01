angular.module('stateMock',[])

  .service("$state", function($stateParams){
    this.expectedTransitions = [];

    this.current = {
      data: {}
    };
    
    this.transitionTo = function(stateName, stateParams) {
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
    };

    this.go = function (stateName, stateParams) {
      this.transitionTo(stateName, stateParams);
    };

    this.expectTransitionTo = function (stateName, stateParams) {
      this.expectedTransitions.push({name: stateName, params: stateParams});
    };


    this.ensureAllTransitionsHappened = function(){
      if (this.expectedTransitions.length > 0) {
        throw Error('Not all transitions happened!');
      }
    };
  })

  .service('$stateParams', function () {
    return {};
  });