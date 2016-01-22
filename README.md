# angular-electron

angularjs helpers for electron apps

## Installation

```bash
npm install angular-electron
```

```bash
bower install angular-electron
```

> Use 0.1.x for electron < 0.35.0 and 0.2.x for electron > 0.35.0

## Usage

```html
<body>
   <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
   <script src="angular-electron.js"></script>
 </body>
```

```js
angular.module('myModule', ['angular-electron']);
```

## API

### renderer modules

These are all the **renderer modules** that are available as angular services:

`desktopCapturer, ipcRenderer, webFrame, clipboard, crashReporter, nativeImage, screen, shell`

To use them, simply inject them to your components:

```js
angular.module('myModule').controller('myCtrl', ['shell', function(shell) {
  shell.showItemInFolder(pathToItem);
}]);
```

### remote and node modules

These are all the **main modules** that are available as angular services:

`app, autoUpdater, BrowserWindow, contentTracing, dialog, globalShortcut, Menu, MenuItem, powerMonitor,
powerSaveBlocker, protocol, webContents, tray`

**Node modules**:

`buffer, child_process, cluster, crypto, dns, events, fs, http, https, net, os, path, punycode,
querystring, readline, stream, string_decoder, tls, dgram, url, util, v8, vm, zlib`

> All of the modules are lazy required (required only on use).

### remoteProvider

In order to use a node package (e.g. moment), use the remoteProvider to
register the package to an angular service.

```js
angular.module('myModule').config(['remoteProvider', function(remoteProvider) {
  remoteProvider.register('moment');
}]);
```

or

```js
angular.module('myModule').config(['remoteProvider', function(remoteProvider) {
  remoteProvider.register({name: 'newName', require: 'moment'});
}]);
```

then inject it as a regular service

```js
angular.module('myModule').controller('myCtrl', ['moment', function(moment) {

}]);
```

or

```js
angular.module('myModule').controller('myCtrl', ['newName', function(moment) {

}]);
```

You can also register a module by function:

```js
angular.module('myModule').config(['remoteProvider', function(remoteProvider) {
  remoteProvider.register('exec', function(remote) {
    return remote.require('child_process').exec;
  });
}]);
```

then use it

```js
angular.module('myModule').controller('myCtrl', ['exec', function(exec) {
    exec('ls');
}]);
```

### process objects

electron process objects are available as angularjs constants.

```js
angular.module('myModule').controller('myCtrl', ['process', 'remoteProcess',
function(process, remoteProcess) {

}]);
```

### current window

The current window is also available as angularjs constant.

```js
angular.module('myModule').controller('myCtrl', ['currentWindow',
function(currentWindow) {

}]);
```

### current web contents

The current web contents module is also available as angularjs constant.

```js
angular.module('myModule').controller('myCtrl', ['currentWebContents',
function(currentWebContents) {

}]);
```

### external link

This is a directive which opens a link in the default desktop browser.

```html
<a href="https://google.com" external-link>google</a>
<button external-link="https://google.com">google</button>
```

### safe shutdown

safe shutdown is a service which handles pre-shudown actions.

```js
angular.module('myModule').controller('myCtrl', ['safeShutdown',
function(safeShutdown) {
  safeShutdown.register(function() {
    logout();
  });
}]);
```

> The function can return a promise to handle async operations.

> You can register multiple functions

Then use `currentWindow.safeReload` or `app.safeQuit` to reload/quit your app.

> These methods are available only after safeShutdown is instantiated.
