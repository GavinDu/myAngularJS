var sayHello = require('../src/hello.js');

describe("Test Hello Function", function() {
  it("says Hello World.", function() {
    expect(sayHello()).toBe("Hello World.");
  });
});