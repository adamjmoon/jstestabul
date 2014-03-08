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
        self.selectedSuite = new ko.observable();
        self.events = {} ;

        ko.computed(function () {
            if (self.selectedSuite()) {
                if (!self.suites()[self.selectedSuite()].codeModel.processed())
                    self.codeProcessor.process(self.suites()[self.selectedSuite()].codeModel).then(
                        function () {
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

        self.on = function(event, cb){
          self.events[event] = cb;
        };

        var suiteId = '';
        self.add = function (suite) {

            suite.suiteModel.num = Object.keys(self.suiteList).length + 1;
            suiteId = 'suite' + suite.suiteModel.num;
            self.suiteList[suiteId] = suite.suiteModel;
            if (suite.suiteModel.num === 1) {
                self.selectedSuite(suiteId);
                self.bindView();
                self.checkIfDone(self.done);
            }

            self.suites(self.suiteList);

        };

        var testCount = 0;
        self.checkIfDone = function(){
            setTimeout(function(){
                if(testCount < self.stats.tests()){
                    console.log(testCount);
                    console.log(self.stats.tests());
                    testCount = self.stats.tests();
                    self.checkIfDone();
                }
                else{
                    console.log(testCount);
                    console.log(self.stats.tests());
                    if(self.events.end)
                        self.events.end();
                }
            }, 1000);
        };


        self.incrementPassedCount = function () {
            self.stats.tests(self.stats.tests() + 1);
            self.stats.passes(self.stats.passes() + 1);
        };

        self.incrementFailedCount = function () {
            self.stats.tests(self.stats.tests() + 1);
            self.stats.failures(self.stats.failures() + 1);
        };

        self.bindView = function () {
            self.viewBounded(true);
            ko.applyBindings(self, self.outer);
        };

        self.navBindings.setTheme = function (theme) {
            ThemeManager.set(theme);
            self.navBindings.currentTheme(theme);
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
