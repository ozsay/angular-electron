var wrapModules = ['desktopCapturer', 'ipcRenderer', 'webFrame', 'clipboard', 'crashReporter', 'nativeImage', 'screen', 'shell'];

angular.forEach(wrapModules, function (_module) {
  angular.module('angular-electron').service(_module.name || _module, [function() {
    return electronRequire('electron')[_module.require || _module];
  }]);
});
