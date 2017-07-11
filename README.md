# myAngularJS
This is an exercise for building an angularjs framework according the book "Build Your Own AngularJS"

## Day01
Setting up the basic configurations, add ***karma***, ***jasmine***, ***phantomjs***, ***sinon***, ***jshint***, ***browserify***
  
  ```javascript
  npm install --save-dev karma jasmine phantomjs sinon jshint browserify
  ``` 

## Day02
---

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