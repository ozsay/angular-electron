var wrapModules = ['ipc', 'web-frame', 'clipboard', 'crash-reporter', 'native-image', 'screen', 'shell'];

angular.forEach(wrapModules, function (_module) {
  angular.module('angular-electron').service(_module.name || _module, [function() {
    var __module = electronRequire(_module.require || _module);

    return __module;
  }]);
});
