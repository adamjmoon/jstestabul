// Generated by CoffeeScript 1.6.3
define(function() {
  var setup;
  setup = function(options) {
    this.paths = {
      'knockout.validation': "" + options.ref + "lib/knockout.validation",
      'knockout.viewmodel': "" + options.ref + "lib/knockout.viewmodel",
      enrollModel: 'common/models/enrollModel',
      transitions: "" + options.ref + "lib/durandal/transitions",
      lib: "" + options.ref + "lib",
      specs: "" + options.ref + "specs",
      app: "" + options.ref + "app"
    };
    this.bootstrap = ["knockout.validation", "knockout.viewmodel"];
  };
  return setup;
});
