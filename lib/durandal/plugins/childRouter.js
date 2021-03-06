// Generated by CoffeeScript 1.6.3
define(function(require) {
  var ChildRouter, Router;
  Router = require("plugins/router");
  ChildRouter = function() {
    this.createdRouters = {};
  };
  ChildRouter.prototype.create = function(vm, routes, relativeModulePath) {
    if (this.createdRouters[vm.__moduleId__] != null) {
      vm.router = this.createdRouters[vm.__moduleId__];
      return;
    }
    vm.router = Router.createChildRouter().makeRelative({
      moduleId: relativeModulePath,
      fromParent: true
    }).map(routes).buildNavigationModel();
    this.createdRouters[vm.__moduleId__] = vm.router;
  };
  return new ChildRouter();
});
