define(['./ThemeManager', './UnitTestFrameworkManager', './CodeProcessor'], function (ThemeManager, utfm, CodeProcessor) {
    "use strict";
    function view() {

        ThemeManager.init();
        var self = this;
        self.viewBounded = new ko.observable(false);
        self.numberSuites = undefined;
        self.unitTestFrameworkManager = new utfm();
        self.unitTestFrameworkManager.init();
        self.view = document.getElementById('view');
        self.outer = document.getElementById('outer');
        self.header = document.getElementById('main-header');
        self.nav = document.getElementById('main-nav');
        self.suites = new ko.observable({});
        self.suiteList = {};
        self.totals = {};
        self.totals.Tests = new ko.observable(0);
        self.totals.Passed = new ko.observable(0);
        self.totals.Failed = new ko.observable(0);
        self.githubAccount = new ko.observable('adamjmoon');
        self.githubRepo = new ko.observable('itchcork');
        self.githubBranch = new ko.observable('master');
        self.contextRoot = new ko.observable('https://raw.github.com/' + self.githubAccount() + '/' + self.githubRepo() + '/' + self.githubBranch() + '/');
        self.vendorRoot = new ko.observable(self.contextRoot() + 'vendor/');
        self.viewSpecs = new ko.observable(true);
        self.viewSrc = new ko.observable(false);
        self.collapseMocha = new ko.observable(false);
        self.codeProcessor = new CodeProcessor();
        self.selectedSuite = new ko.observable();

        ko.computed(function () {
            if (self.selectedSuite()) {
                if (!self.suites()[self.selectedSuite()].codeModel.processed())
                    self.codeProcessor.process(self.suites()[self.selectedSuite()].codeModel).then(
                        function () {
                            console.log("sdfsadf");
                        }
                    );
            }
        }).extend({
                throttle: 1000
            });


        self.navBindings = {};
        self.navBindings.themeManager = ThemeManager;
        self.navBindings.currentTheme = ko.observable(amplify.store('currentTheme'));
        self.currentView = ko.observable('');

        var customTheme = amplify.store('customTheme');
        self.navBindings.cto = {};
        for (var prop in customTheme) {
            self.navBindings.cto[prop] = ko.observable(customTheme[prop]);
        }
        for (var prop in self.navBindings.cto) {
            self.navBindings.cto[prop].subscribe(new Function('newValue', "window.themeManager.updateCustom('" + prop + "',newValue);")

            );
        }


        var suiteId = '';
        self.add = function (suite) {

            suite.suiteModel.num = Object.keys(self.suiteList).length + 1;
            suiteId = 'suite' + suite.suiteModel.num;
            self.suiteList[suiteId] = suite.suiteModel;
            if (suite.suiteModel.num === 1) {
                self.selectedSuite(suiteId);
                self.bindView();
            }

            self.suites(self.suiteList);

            if(Object.keys(self.suiteList).length >= self.expectedSuiteCount){
                if(self.done){
                    self.done();
                }
            }
//            suite.vm.benchmarksDone.subscribe(function (newValue) {
//                console.log('Donnnnne');
//            });

        };

        self.done = function () {

        };

        self.incrementPassedCount = function () {
            self.totals.Tests(self.totals.Tests() + 1);
            self.totals.Passed(self.totals.Passed() + 1);
        };

        self.incrementFailedCount = function () {
            self.totals.Tests(self.totals.Tests() + 1);
            self.totals.Failed(self.totals.Failed() + 1);
        };

        self.bindView = function () {
            self.viewBounded(true);
            ko.applyBindings(self, self.outer);

            require(['lib/jscolor'], function () {
                jscolor.init();
            });
        };

        self.navBindings.setTheme = function (theme) {
            ThemeManager.set(theme);
            self.navBindings.currentTheme(theme);
        };


        self.changeMochaSuitesState = function () {
            var pass = $("ul#mocha-report li.pass");
            var fail = $("ul#mocha-report li.fail");
            self.collapseMocha(!self.collapseMocha());
//            if(self.collapseMocha()){
//               $("#mochaSuiteExpander").removeClass('expandAll').addClass('collapseAll');
//            } else {
//                $("#mochaSuiteExpander").removeClass('collapseAll').addClass('expandAll');
//            }

            $(pass).each(function (index, element) {
                element.hidden = self.collapseMocha();
            });

            $(fail).each(function (index, element) {
                element.hidden = false;
            });
        };

        self.selectSuite = function (suite) {
            if (self.selectedSuite() === suite) {
                //                self.selectedSuite(false);
            } else {
                self.selectedSuite(suite);
            }
        };


    }


    return view;
});
