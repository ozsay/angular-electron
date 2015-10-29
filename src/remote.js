var remoteModules = ['app', 'auto-updater', 'browser-window', 'content-tracing', 'dialog',
                     'global-shortcut', 'menu', 'menu-item', 'power-save-blocker',
                     'protocol', 'web-contents', 'tray'];
var nodeModules = ['buffer', 'child_process', 'cluster', 'crypto', 'dns', 'events', 'fs', 'http',
                   'https', 'net', 'os', 'path', 'punycode', 'querystring', 'readline', 'stream',
                   'string_decoder', 'tls', 'dgram', 'url', 'util', 'v8', 'vm', 'zlib'];

angular.module('angular-electron').provider('remote', ['$provide', function($provide) {
  var remote = require('remote');

  function register(name, _require) {
    _require = _require || name;

    $provide.service(name, function() {
      var __module = remote.require(_require);

      return __module;
    });
  }

  this.register = register;

  this.$get = [function() {
    return remote;
  }];

  $provide.constant('remoteProcess', remote.process);
  $provide.constant('currentWindow', remote.getCurrentWindow());

  angular.forEach(remoteModules, function(remoteModule) {
    register(remoteModule.name || remoteModule, remoteModule.require);
  });

  angular.forEach(nodeModules, function(nodeModule) {
    register(nodeModule.name || nodeModule, nodeModule.require);
  });
}]);
