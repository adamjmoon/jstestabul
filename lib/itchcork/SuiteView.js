define(['./UnitTestFrameworkManager', './CodeProcessor'], function (utfm, CodeProcessor) {
    "use strict";
    function view() {

        var self = this;
        self.viewBounded = new ko.observable(false);
        self.numberSuites = undefined;
        self.unitTestFrameworkManager = new utfm();
        self.unitTestFrameworkManager.init();
        self.suites = new ko.observableArray([]);
        self.stats = {};
        self.stats.tests = new ko.observable(0);
        self.stats.passes = new ko.observable(0);
        self.stats.failures = new ko.observable(0);
        self.githubAccount = new ko.observable('adamjmoon');
        self.githubRepo = new ko.observable('itchcork');
        self.githubBranch = new ko.observable('master');
        self.contextRoot = new ko.observable('https://raw.github.com/' + self.githubAccount() + '/' + self.githubRepo() + '/' + self.githubBranch() + '/');
        self.vendorRoot = new ko.observable(self.contextRoot() + 'vendor/');
        self.viewSpecs = new ko.observable(true);
        self.viewSrc = new ko.observable(false);
        self.collapseMocha = new ko.observable(false);
        self.codeProcessor = new CodeProcessor();
        self.selectedSuite = new ko.observable(0);
        self.events = {};
        self.suitesReady = new ko.observable(false);
        self.suiteCount = 0;
        self.selectedCodeModel = new ko.observable();

        self.selectedSuite.subscribe(function(suite){
            self.selectedCodeModel(self.suites()[suite].codeModel);
        });

        self.add = function (suite) {
            suite.suiteModel.num = self.suiteCount;
            self.suiteCount++;

            self.codeProcessor.process(suite.suiteModel.codeModel).then(
                function () {
                    self.suites.push(suite.suiteModel);

                    if(suite.suiteModel.num > 0){
                      self.suitesReady(true);
                    }

                }
            );
        };

        self.incrementPassedCount = function () {
            self.stats.tests(self.stats.tests() + 1);
            self.stats.passes(self.stats.passes() + 1);
        };

        self.incrementFailedCount = function () {
            self.stats.tests(self.stats.tests() + 1);
            self.stats.failures(self.stats.failures() + 1);
        };

        self.changeMochaSuitesState = function () {
            var pass = $("ul#mocha-report li.pass");
            var fail = $("ul#mocha-report li.fail");
            self.collapseMocha(!self.collapseMocha());

            $(pass).each(function (index, element) {
                element.hidden = self.collapseMocha();
            });

            $(fail).each(function (index, element) {
                element.hidden = false;
            });
        };

    }


    return view;
});
