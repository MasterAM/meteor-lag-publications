/* global publicationConfigurator: true */
'use strict';

var wrapper, _publish;
var pkg = Package['alon:lag-base'];
var api = pkg.API;
var baseConfigurator = api._getBaseConfigurator();
publicationConfigurator = new pkg.Configurator('publication', baseConfigurator, defaultConfigs);
wrapper =  new pkg.Wrapper(publicationConfigurator);

// wrap Meteor.methods
_publish = Meteor.publish;

Meteor.publish = function (name, cb) {
  return _publish.call(this, name, wrapper.wrap(name, cb));
};

// rewrite currently registered publications
Meteor.server.publish_handlers = wrapper.wrapDict(Meteor.server.publish_handlers);
Meteor.server.universal_publish_handlers = wrapper.wrapArray(Meteor.server.universal_publish_handlers);