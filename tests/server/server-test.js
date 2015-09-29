// create publications
var handler = function(intArg, stringVar) {
  check(intArg, Number);
  check(stringVar, String);
  return this.ready();
};
var api = Package['alon:lag-base'].API;

['foo', 'bar', 'baz'].forEach(function (name) {
  Meteor.publish(name, handler);
});

//Test API:
//test.isFalse(v, msg)
//test.isTrue(v, msg)
//test.equal(actual, expected, message, not)
//test.length(obj, len)
//test.include(s, v)
//test.isNaN(v, msg)
//test.isUndefined(v, msg)
//test.isNotNull
//test.isNull
//test.throws(func)
//test.instanceOf(obj, klass)
//test.notEqual(actual, expected, message)
//test.runId()
//test.exception(exception)
//test.expect_fail()
//test.ok(doc)
//test.fail(doc)
//test.equal(a, b, msg)

api.setDelaysFor('publication', customDelays);

Tinytest.add('make sure that the configurator is available', function(test) {
  test.isTrue(typeof Package['alon:lag-publications'].publicationConfigurator === 'object', 'the configurator is available');
});
