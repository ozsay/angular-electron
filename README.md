# angular-electron

angularjs helpers for electron apps

## Installation

```bash
npm install angular-electron
```

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

Theses are all the **renderer modules** that are available as angular services:

`ipc, web-frame, clipboard, crash-reporter,
native-image, remote, screen, shell`

To use them, simply inject them to your components:

```js
angular.module('myModule').controller('myCtrl', ['shell', function(shell) {
  shell.showItemInFolder(pathToItem);
}]);
```

### remote and node modules

Theses are all the **main modules** that are available as angular services:

`app, auto-updater, browser-window, content-tracing, dialog, global-shortcut,
menu, menu-item, power-save-blocker, protocol, web-contents, tray`

**Node modules**:

`buffer, child_process, cluster, crypto, dns, events, fs, http, https, net, os,
path, punycode, querystring, readline, stream, string_decoder, tls, dgram, url,
util, v8, vm, zlib`

> All of the modules are required upon instantiation.

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
