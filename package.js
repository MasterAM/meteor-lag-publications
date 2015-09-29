Package.describe({
  name: 'alon:lag-publications',
  summary: 'Adds delay to publications on your development machine.',
  version: '1.0.0',
  git: 'https://github.com/MasterAM/meteor-lag-publications',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.use(['meteorhacks:unblock@1.0.2']);
  api.use(['alon:lag-base@1.0.0']);
  api.addFiles([
    'lib/globals.js',
    'lib/bootstrap.js'
  ], 'server');
  api.export('publicationConfigurator', 'server');
});

Package.onTest(function(api) {
  api.use('check', 'server');
  api.use('tinytest');
  api.use('alon:lag-publications');
  api.addFiles('tests/server/configs.js', ['client', 'server']);
  api.addFiles('tests/server/server-test.js', 'server');
  api.addFiles('tests/client/client-test.js', 'client');
});
