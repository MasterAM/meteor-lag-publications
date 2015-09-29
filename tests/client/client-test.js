customDelays.baz = defaultDelay;
var margin = 200;
var async = function (name, delay, test, next) {
  var tStart = new Date().getTime();
  var handle = Meteor.subscribe(name, 1, '1', function () {
    var dt = new Date().getTime() - tStart;
    test.isTrue(dt >= delay, 'method call takes more than ' + delay + ' ms');
    test.isTrue(dt <= delay + margin, 'method call takes less than ' + delay + margin + ' ms');
    handle.stop();
    next();
  });
};


['foo', 'bar', 'baz'].forEach(function (name) {
  Tinytest.addAsync("delay of subscription to " + name + " call from the client", function (test, next) {
    async(name, customDelays[name], test, next);
  });
});
