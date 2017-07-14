'use strict';

var Scope = require('../src/scope');

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
  });
});
