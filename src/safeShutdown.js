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
