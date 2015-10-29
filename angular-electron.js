(function(angular, undefined) {'use strict';

angular.module('angular-electron', []);

angular.module('angular-electron').directive('externalLink', ['shell', function (shell) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.on('click', function(event) {
        event.preventDefault();

        shell.openExternal(attrs.href || attrs.externalLink);
      });
    }
  };
}]);

angular.module('angular-electron').constant('process', process);

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

var wrapModules = ['ipc', 'web-frame', 'clipboard', 'crash-reporter', 'native-image', 'screen', 'shell'];

angular.forEach(wrapModules, function (_module) {
  angular.module('angular-electron').service(_module.name || _module, [function() {
    var __module = require(_module.require || _module);

    return __module;
  }]);
});

angular.module('angular-electron').service('safeShutdown', ['$q', 'currentWindow', 'app', function($q, currentWindow, app) {
  var actions = [];

  function register(fn) {
    this.actions.push(fn);
  }

  function exec() {
    var promises = [];

    angular.forEach(this.actions, function (action) {
      var res = action();

      if (res !== undefined && res.then !== undefined) {
        promises.push(res);
      }
    });

    return $q.all(promises);
  }

  currentWindow.safeReload = function() {
    exec().then(function() {
      currentWindow.reload();
    });
  };

  app.safeQuit = function() {
    exec().then(function() {
      app.quit();
    });
  };

  return {
    register: register
  };
}]);

})(window.angular);