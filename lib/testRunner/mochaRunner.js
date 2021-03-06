// Generated by CoffeeScript 1.6.3
define(["lib/chai", "lib/sinon-chai"], function(chai, sinonChai) {
  var run, startMocha;
  window.expect = chai.expect;
  chai.use(sinonChai);
  chai.Assertion.includeStack = true;
  chai.Assertion.addChainableMethod("you", (function() {}), function() {
    return this;
  });
  startMocha = function(mochaDone, ItchCork) {
    var runner;
    runner = mocha.run();
    runner.on("end", function() {
      ItchCork.viewModel.stats.tests(runner.total);
      ItchCork.viewModel.stats.passes(runner.stats.passes);
      ItchCork.viewModel.stats.failures(runner.stats.failures);
      $("#mocha a").attr("href", "#");
      $("#mocha code").addClass("well");
      $("#mocha a").click(function() {
        var tests;
        tests = Array.prototype.slice.call($(this).parent().siblings()[0].children);
        return tests.forEach(function(test) {
          if (test.hidden) {
            test.hidden = false;
          } else {
            test.hidden = true;
          }
        });
      });
      mochaDone(runner.stats);
    });
  };
  run = function(specs, require, ItchCork, mochaDone) {
    var callbackCount, errorCount, i, j, mochaStarted;
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.checkLeaks();
      mocha.globals(['jQuery']);
      mocha.setup("bdd");
      mocha.reporter("html");
      mochaStarted = false;
      i = 0;
      callbackCount = 0;
      errorCount = 0;
      while (i < specs.length) {
        j = i;
        require([specs[i]], (function(spec) {
          callbackCount++;
          if (callbackCount === specs.length - errorCount) {
            startMocha(mochaDone, ItchCork);
          }
        }));
        i++;
      }
    }
  };
  return run;
});
