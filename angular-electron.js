(function(angular, electronRequire, electronProcess, undefined) {'use strict';

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

angular.module('angular-electron').constant('process', electronProcess);

var remoteModules = ['app', 'autoUpdater', 'BrowserWindow', 'contentTracing', 'dialog',
                     'globalShortcut', 'Menu', 'MenuItem', 'powerMonitor', 'powerSaveBlocker',
                     'protocol', 'webContents', 'tray'];
var nodeModules = ['buffer', 'child_process', 'cluster', 'crypto', 'dns', 'events', 'fs', 'http',
                   'https', 'net', 'os', 'path', 'punycode', 'querystring', 'readline', 'stream',
                   'string_decoder', 'tls', 'dgram', 'url', 'util', 'v8', 'vm', 'zlib'];

angular.module('angular-electron').provider('remote', ['$provide', function($provide) {
  var remote = electronRequire('electron').remote;

  function registerElectronModule(_module) {
    $provide.service(_module, function() {
      return remote[_module];
    });
  }

  function registerNodeModule(name, _require) {
    _require = _require || name;

    $provide.service(name, function() {
      return typeof _require === 'function' ? _require(remote) : remote.require(_require);
    });
  }

  this.register = registerNodeModule;

  this.$get = [function() {
    return remote;
}];

  $provide.constant('remoteProcess', remote.process);
  $provide.constant('currentWindow', remote.getCurrentWindow());
  $provide.constant('currentWebContents', remote.getCurrentWebContents());

  angular.forEach(remoteModules, function(remoteModule) {
    registerElectronModule(remoteModule);
  });

  angular.forEach(nodeModules, function(nodeModule) {
    registerNodeModule(nodeModule.name || nodeModule, nodeModule.require);
  });
}]);

var wrapModules = ['desktopCapturer', 'ipcRenderer', 'webFrame', 'clipboard', 'crashReporter', 'nativeImage', 'screen', 'shell'];

angular.forEach(wrapModules, function (_module) {
  angular.module('angular-electron').service(_module.name || _module, [function() {
    return electronRequire('electron')[_module.require || _module];
  }]);
});

angular.module('angular-electron').service('safeShutdown', ['$q', 'currentWindow', 'app', function($q, currentWindow, app) {
  var actions = [];

  function register(fn) {
    actions.push(fn);
  }

  function exec() {
    var promises = [];

    angular.forEach(actions, function (action) {
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

})(window.angular, window.require, window.process);
