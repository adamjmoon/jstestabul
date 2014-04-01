define(['./Suite', './SuiteView', './Spy', './Verify', 'require'], function (Suite, SuiteView, Spy, Verify, require) {
    var ic = {
        Suite: Suite,
        suiteView: new SuiteView(),
        Spy: Spy,
        Verify: Verify,
        events: {},
        stats: {},
        options: {specs: []}
    };

    ic.Suite.prototype.linkView(ic.suiteView);

    ic.on = function (event, cb) {
        ic.events[event] = cb;
    };

    var testCount = 0;
    ic.checkIfDone = function () {
        setTimeout(function () {
            if (testCount < ic.suiteView.stats.tests()) {
                testCount = ic.suiteView.stats.tests();
                ic.checkIfDone();
            }
            else {
                ic.stats.tests = ic.suiteView.stats.tests();
                ic.stats.passes = ic.suiteView.stats.passes();
                ic.stats.failures = ic.suiteView.stats.failures();
                if (ic.events.end)
                    ic.events.end();
            }
        }, 1000);
    };

    ic.run = function(){
        require(ic.options.specs,function(){
            ic.checkIfDone();
        });
    };


    window._bTestResults = {};
    return ic;
});

