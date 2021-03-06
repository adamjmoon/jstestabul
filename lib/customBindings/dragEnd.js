// Generated by CoffeeScript 1.6.3
define(function() {
  ko.bindingHandlers.dragEnd = {
    init: function(element, valueAccessor) {
      var action, el;
      el = $(element);
      action = valueAccessor();
      if (el.hammer == null) {
        return;
      }
      return el.hammer().on("dragEnd", function(event) {
        action();
      });
    }
  };
});
