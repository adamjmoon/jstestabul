// Generated by CoffeeScript 1.6.3
define('jquery', function() {
  return $;
});

define('knockout', function() {
  return ko;
});

require(['lib/coffeescript'], function(CoffeeScript) {
  window.CoffeeScript = CoffeeScript;
});

define(function(require) {
  require(['lib/itchcork/itchcork'], function() {
    require(["lib/sinon", "lib/hammer", "lib/jquery.scrollTo", "lib/jquery.localScroll", "lib/customBindings", 'lib/testRunner/mochaRunner'], function() {
      require(["itchcork"], function(ItchCork) {
        $.get("/specs", function(options) {
          ItchCork.options = options;
        });
      });
    });
  });
});