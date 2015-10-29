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
