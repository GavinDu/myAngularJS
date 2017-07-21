'use strict';

var Scope = require('../src/scope');
var _ = require('lodash');
describe("Scope", function() {
  it("can be constructed and used as an object", function() {
    var scope = new Scope();
    scope.aProperty = 1;
    expect(scope.aProperty).toBe(1);
  });

  describe("digest", function() {
    var scope;
    beforeEach(function() {
      scope = new Scope();
    });

    it("calls the listener function of a watch on the first $digest", 
      function(){
        var watchFn = function() {
          return "WAT";
        };
        var listenerFn = jasmine.createSpy();
        scope.$watch(watchFn, listenerFn);
        scope.$digest();
        expect(listenerFn).toHaveBeenCalled();
    });

    it("calls the watch function with the scope as the argument",
      function() {
        var watchFn = jasmine.createSpy();
        var listenerFn = function() {};
        scope.$watch(watchFn, listenerFn);
        scope.$digest();
        expect(watchFn).toHaveBeenCalledWith(scope);
    });

    it("calls the listener function when the watched value changes", 
      function() {
        scope.someValue = 'a';
        scope.count = 0;

        scope.$watch(
          function(scope) {
            return scope.someValue;
          },
          function(newValue, oldValue, scope) {
            scope.count++;
        });

        expect(scope.count).toBe(0);

        scope.$digest();
        expect(scope.count).toBe(1);

        // scope.$digest();
        // expect(scope.count).toBe(2);
        
        // scope.$digest();
        // expect(scope.count).toBe(3);
    });
    
    it("calls listener with new value as old value the first time",
      function(){
        scope.someValue = 123;
        var oldValueGiven;
        scope.$watch(
          function(scope){
            return scope.someValue;
          },
          function(newValue, oldValue, scope) {
            oldValueGiven = oldValue;
          }
        );

        scope.$digest();
        expect(oldValueGiven).toBe(123);
    });

    it("calls watch function without invoke the listener function",
      function() {
        var watchFn = jasmine.createSpy().and.returnValue("something");
        scope.$watch(watchFn);
        scope.$digest();
        expect(watchFn).toHaveBeenCalled();
    });

    it("triggers chained watchers in the same digest",
      function() {
        scope.name = "Jane";

        scope.$watch(
          function(scope) {
            return scope.nameUpper;
          },
          function(newValue, oldValue, scope) {
            if (newValue) {
              scope.initial = newValue.substring(0,1) + '.';
            }
          }
        );

        scope.$watch(
          function(scope) {
            return scope.name;
          },
          function(newValue, oldValue, scope) {
            if (newValue) {
              scope.nameUpper = newValue.toUpperCase();
            }
          }
        );

        scope.$digest();
        expect(scope.initial).toBe('J.');

        scope.name = 'Bob';
        scope.$digest();
        expect(scope.initial).toBe('B.');

    });

    it("give up on the watches after 10 iterations", function() {
      scope.counterA = 0;
      scope.counterB = 0;
      scope.$watch(
        function(scope) {
          return scope.counterA;
        },
        function(newValue, oldValue, scope) {
          scope.counterB++;
        }
      );

      scope.$watch(
        function(scope) {
          return scope.counterB;
        },
        function(newValue, oldValue, scope) {
          scope.counterA++;
        }
      );

      expect((function(){
        scope.$digest();
      })).toThrow();
    });

    it("ends the digest when the last watch is clean", function() {
      scope.array = _.range(100);
      var watchExecutions = 0;

      _.times(100, function(i) {
        scope.$watch(
          function(scope) {
            watchExecutions++;
            return scope.array[i];
          },
          function(newValue, oldValue, scope) {
          }
        );
      });

      scope.$digest();
      expect(watchExecutions).toBe(200);
      
      scope.array[5] = 404;
      scope.$digest();
      expect(watchExecutions).toBe(306);
    });

    it("compares based on value if enabled", function() {
      scope.aValue = [1, 2, 3];
      scope.counter = 0;
      scope.$watch(
        function(scope) {
          return scope.aValue;
        },
        function(newValue, oldValue, scope) {
          scope.counter++;
        },
        true
      );

      scope.$digest();
      expect(scope.counter).toBe(1);

      scope.aValue.push(4);
      scope.$digest();
      expect(scope.counter).toBe(2);
    });

    it("correctly handles NaNs", function() {
      scope.aValue = 0/0; // This means the value is NaN.
      scope.count = 0;

      scope.$watch(
        function(scope) {
          return scope.aValue;
        },
        function(newValue, oldValue, scope) {
          scope.count++;
        }
      );

      scope.$digest();
      expect(scope.count).toBe(1);

      scope.$digest();
      expect(scope.count).toBe(1);
    });

    it("executes $eval'ed function and returns result", function(){
      scope.aValue = 33;

      var result = scope.$eval(function(scope) {
        return scope.aValue;
      });

      expect(result).toBe(33);
    });

    it("passes the second $eval argument straight through", function() {
      scope.aValue = 33;

      var result = scope.$eval(function(scope, arg) {
        return scope.aValue+arg;
      }, 10);

      expect(result).toBe(43);
    });

  });
});
