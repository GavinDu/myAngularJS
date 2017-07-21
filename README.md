# myAngularJS
This is an exercise for building an angularjs framework according the book "Build Your Own AngularJS"

## Day01

Setting up the basic configurations, add ***karma***, ***jasmine***, ***phantomjs***, ***sinon***, ***jshint***, ***browserify***
  
  ```javascript
  npm install --save-dev karma jasmine phantomjs sinon jshint browserify
  ``` 

## Day02

Installing ***Lodash*** and ***jQuery*** libraries for two reasons:
  > 1. Array and object manipulation, such as equality checking and cloning, will be delegated to the ***Lodash***.
  > 2. DOM querying and manipulation will be delegated to ***jQuery***

  ```node
  npm install --save lodash jquery 
  ```
  
### Scopes (Plain JavaScript Object)
---
**The purposes of Scopes**
1. Sharing data between controllers and views
2. Sharing data between different parts of the application
3. Broadcasting and listening for events
4. Watching for changes in data

**Four main areas of functionality of Scope**
1. The digest cycle and dirty-checking (`$watch`, `$digest`, and `$apply`).
2. Scope inheritance, the mechanism for scope hierarchies for sharing data and events.
3. Efficient dirty-checking for collections - `arrys` and `object`.
4. The event system (`$on`, `$emit`, and `$broadcast`).

`$watch` and `$digest` are two sides of the same coin. Together they form the core of what the digest cycle is all about: Reacting to changes in data.

## Day03

**The performance characteristics of Scope**
1. Attaching data to a scope does not by itself have an impact on performance.
If no watcher is watching a property, it doesn't matter if it's on the scope or
not. Angular does not iterate over the properties of a scope. It iterates over
the watches.
2. Every watch function is called during every $digest. For this reason, it's a
good idea to pay attention to the number of watches you have, as well as the 
performance of each individual watch function or expression.

**To only call watch function with listener function**

In the watcher object, `lisenterFn: lisenterFn || function() {}` define a empty
function for without defining listener function. Also, Angular use the return 
value of `watchFn`, even when there is no `listenFun`.

## Day04

**Idempotent function**
A function should have no side effects, or only side effects that can happen any
number of times. For example, if a watch fires an AJAX request, there are no
guarantees about how many requests your app is making.

## Day05

**Value-Based Dirty Checking**
Using `_.isEqual()` deeply compare two values, and 

```js
  typeof newValue == 'number' && 
  typeof oldValue == 'number' &&
  isNaN(newValue) && isNaN(oldValue)
```

**Evaluing Code In The Context of A Scope**
$eval is the Angular method to run the code in the context of A scope.