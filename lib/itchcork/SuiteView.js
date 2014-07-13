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
        self.codeProcessor = new CodeProcessor();;
        self.events = {};
        self.suitesReady = new ko.observable(false);
        self.suiteCount = 0;
        self.selectedCodeModel = new ko.observable();
        self.selectedSuiteModel = new ko.observable();
        self.selectedSuite = undefined

        self.selectSuite = (function (suiteDesc) {
           self.selectedSuite = _.find(self.suites(), function (suite) {
                return suite.suiteDesc === suiteDesc;
            });
            self.selectedSuiteModel(self.selectedSuite);
            self.selectedCodeModel(self.selectedSuite.codeModel);
        });

        self.add = function (suite) {
            if (suite.suiteModel && suite.suiteModel.codeModel) {
                self.codeProcessor.process(suite.suiteModel.codeModel,
                    function () {
                        self.suites.push(suite.suiteModel);
                        self.suiteCount = self.suiteCount + 1;
                        if (self.suiteCount === 1) {
                            self.selectedSuiteModel(suite.suiteModel);
                            self.selectedCodeModel(suite.suiteModel.codeModel);
                            self.suitesReady(true);
                        }
                        self.suites(_.sortBy(self.suites(), 'suiteDesc'))
                    }
                );
            }
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
