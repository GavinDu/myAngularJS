'use strict';
var _ = require('lodash');
/**
 * A watcher is something that is notified when a change occurs in the scope.
 * Two functions are provided to $watch:
 * 1. A watch function, which specifies the piece of data you're interested in.
 * 2. A listener function, which will be called whenever that data changes.
 * 
 * Usually, watch expressions (a string) are used instead of the watch function,
 * in a data binding, a directive, a interpolation. They, in low level, will be
 * parsed and compiled into a watch function.
 * 
 * 
 * $digest iterates all the watchers that have been attached on the scope, and
 * runs their watch and lisenter functions accordingly.
 */
function Scope() {
  /**
   * $$ sign signifies that this variable should be considered private for this
   * framework, and should not be called from application code.
   */
  this.$$watchers = [];
}

/** 
 * The purpose of initWatchVal function is to initialize the last value.
*/
function initWatchVal() {}

Scope.prototype.$watch = function(watchFn, lisenterFn) {
  /**
   * watchFn: monitor the data you're interested in.
   * lisenterFn: called when data changes.
   * last: the oldValue is stored in here.
   * 
   * The last needs to be initialized with a value that will never equal to
   * others including undefined, null, except itself. So a function fits this
   * purpose well, since in JavaScript functions are so-called reference values,
   * which are not considered equal to anything but themselves.
   */
  var watcher = {
    watchFn: watchFn,
    lisenterFn: lisenterFn || function() {},
    last: initWatchVal
  };
  this.$$watchers.push(watcher);
};

/**
 * The $digest function:
 * The job of it is to call the watch function and compare its return value to
 * whatever the same function returned last time. If the value differ, the 
 * watcher is dirty and its listner function should be called.
 */
Scope.prototype.$digest = function() {
  var self = this;
  var newValue;
  var oldValue;
  _.forEach(this.$$watchers, function(watcher) {
    newValue = watcher.watchFn(self);
    oldValue = watcher.last;
    if (newValue !== oldValue) {
      watcher.last = newValue;
      watcher.lisenterFn(newValue, (oldValue === initWatchVal ?
        newValue : oldValue), 
        self);  
    }
  });
};

module.exports = Scope;