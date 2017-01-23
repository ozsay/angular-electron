angular.module('angular-electron').constant('process', electronProcess);

if (typeof electronRequire == 'undefined') {
    var electronRequire = function () {
      return {
        remote: {
          getCurrentWindow: function () {
            return false;
          },
          getCurrentWebContents: function () {
            return false;
          }
        },
      };
    }
  }
