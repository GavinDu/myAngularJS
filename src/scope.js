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

Scope.prototype.$watch = function(watchFn, lisenterFn) {
  /**
   * watchFn: monitor the data you're interested in.
   * lisenterFn: called when data changes.
   */
  var watcher = {
    watchFn: watchFn,
    lisenterFn: lisenterFn
  };
  this.$$watchers.push(watcher);
};

Scope.prototype.$digest = function() {
  _.forEach(this.$$watchers, function(watcher) {
    watcher.lisenterFn();
  });
};

module.exports = Scope;