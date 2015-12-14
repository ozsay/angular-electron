angular.module('myModule', ['angular-electron']);

angular.module('myModule').controller('TestCtrl', function($injector) {
    var modules = ['desktopCapturer', 'ipcRenderer', 'webFrame', 'clipboard', 'crashReporter', 'nativeImage', 'screen', 'shell'];

    modules.push('process');
    modules.push('remoteProcess');
    modules.push('currentWindow');
    modules.push('currentWebContents');

    modules = modules.concat(['app', 'autoUpdater', 'BrowserWindow', 'contentTracing', 'dialog',
        'globalShortcut', 'Menu', 'MenuItem', 'powerMonitor', 'powerSaveBlocker',
        'protocol', 'webContents', 'tray']);

    modules = modules.concat(['buffer', 'child_process', 'cluster', 'crypto', 'dns', 'events', 'fs', 'http',
        'https', 'net', 'os', 'path', 'punycode', 'querystring', 'readline', 'stream',
        'string_decoder', 'tls', 'dgram', 'url', 'util', 'v8', 'vm', 'zlib']);

    angular.forEach(modules, function(_module) {
        var injected = $injector.get(_module);

        console.log(_module, injected);
    });
});
