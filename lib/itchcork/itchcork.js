define(['./Suite', './ViewModel', './Spy', './Verify','./CodeProcessor','./CodeModel','./SpecModel', 'require'], function (Suite, ViewModel, Spy, Verify, CodeProcessor, CodeModel, SpecModel, require) {
    var ic = {
        Suite: Suite,
        viewModel: new ViewModel(),
        Spy: Spy,
        Verify: Verify,
        SpecModel: SpecModel,
        CodeModel: CodeModel,
        codeProcessor: new CodeProcessor(),
        events: {},
        stats: {},
        options: {specs: [], sourceList: []}
    };

    ic.Suite.prototype.linkView(ic.viewModel);

    ic.on = function (event, cb) {
        ic.events[event] = cb;
    };

    var testCount = 0;
    ic.checkIfDone = function () {
        setTimeout(function () {
            if (testCount < ic.viewModel.stats.tests()) {
                testCount = ic.viewModel.stats.tests();
                ic.checkIfDone();
            }
            else {
                ic.stats.tests = ic.viewModel.stats.tests();
                ic.stats.passes = ic.viewModel.stats.passes();
                ic.stats.failures = ic.viewModel.stats.failures();
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

