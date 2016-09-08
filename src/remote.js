var remoteModules = ['app', 'autoUpdater', 'BrowserWindow', 'contentTracing', 'dialog',
                     'globalShortcut', 'Menu', 'MenuItem', 'powerMonitor', 'powerSaveBlocker',
                     'protocol', 'webContents', 'tray'];
var nodeModules = ['buffer', 'child_process', 'cluster', 'crypto', 'dns', 'events', 'fs', 'http',
                   'https', 'net', 'os', 'path', 'punycode', 'querystring', 'readline', 'stream',
                   'string_decoder', 'tls', 'dgram', 'url', 'util', 'v8', 'vm', 'zlib'];

angular.module('angular-electron').provider('remote', ['$provide', function($provide) {
  var remote = null;

  if (usingElectron() === true){
    remote = electronRequire('electron').remote;

    this.register = registerNodeModule;

    angular.forEach(remoteModules, function(remoteModule) {
      registerElectronModule(remoteModule);
    });

    angular.forEach(nodeModules, function(nodeModule) {
      registerNodeModule(nodeModule.name || nodeModule, nodeModule.require);
    });

    $provide.constant('remoteProcess', remote.process);
    $provide.constant('currentWindow', remote.getCurrentWindow());
    $provide.constant('currentWebContents', remote.getCurrentWebContents());
  }

  this.$get = [function() {
    return remote;
  }];

  $provide.constant('usingElectron', usingElectron());

  function usingElectron(){
    return angular.isDefined(electronRequire) && angular.isDefined(electronRequire('electron'));
  }

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

}]);
