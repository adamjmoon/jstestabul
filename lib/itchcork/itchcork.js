define(['./Suite','./SuiteView','./Spy', './Verify'],function (Suite,SuiteView,Spy,Verify) {
    var itchCork = {
        Suite: Suite,
        suiteView: new SuiteView(),
        Spy: Spy,
        Verify: Verify
    };

    itchCork.Suite.prototype.linkView(itchCork.suiteView);

    window._bTestResults = {};
    return itchCork;
});

