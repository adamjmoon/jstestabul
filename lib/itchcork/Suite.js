define(['./Test', './SuiteModel'], function (Test, SuiteModel) {
    function Suite(moduleName, jsFunctionOrObject) {
        "use strict";
        var self = this;
        this.suiteModel;
        self.desc = moduleName;
        self.jsFunctionOrObject = jsFunctionOrObject;

        this.suiteModel = new SuiteModel();
        this.suiteModel.suiteDesc(this.desc);
        this.suiteModel.codeModel.jsFunctionOrObject = jsFunctionOrObject;
        this.suiteModel.codeModel.moduleName = moduleName;
        if (jsFunctionOrObject instanceof Function) {
           this.suiteModel.codeModel.jsContext = new jsFunctionOrObject();
        }
        else
           this.suiteModel.codeModel.jsContext = this.jsFunctionOrObject;

        if(this.linkedView)
            this.linkedView.add(self);

        self.add = function (test, shouldBe) {
            if (typeof func === 'function') {
                self.addTestWithBenchmarks(shouldBe, test, null, false, '');
            } else if (typeof func === 'object') {

                self.addTestWithBenchmarks(test.is, test.test, null, false, '');
            }
            return self;
        }

        self.currentTest;

        self.it = function (func, shouldBe, describe) {
            self.currentTest = self.addTestWithBenchmarks(shouldBe, func, null, true, describe);

            return self;
        };

        self.shouldBe = function shouldBe(val) {
            self.currentTest.shouldEqual = val;
            self.processTest(self.currentTest);
            return self;
        };

        self.processTest = function (test) {
            if (test.run()) {
                self.suiteModel.passedCount(self.suiteModel.passedCount() + 1);
                self.linkedView.incrementPassedCount();
            } else {
                self.suiteModel.failedCount(self.suiteModel.failedCount() + 1);
                self.linkedView.incrementFailedCount();
            }
            self.suiteModel.tests.push(test);
        };

        self.addTestWithBenchmarks = function (shouldEqual, testFunc, name, defer, describe) {
            var test = new Test(shouldEqual, testFunc, self.jsFunctionOrObject instanceof Function ? new self.jsFunctionOrObject() : self.jsFunctionOrObject, name, describe);
            if (!defer) {
                self.processTest(test);
            }


            if (name) {
                var fn = (function (context, name) {
                    return function () {
                        context[name]();
                    };
                })(this.suiteModel.codeModel.jsContext, name);
                self.suiteModel.benchmarkSuite.add({
                    'name': test.expression,
                    'fn': fn,
                    'async': true,
                    'queued': true,
                    'minSamples': 100});
            }
            else {
                self.suiteModel.benchmarkSuite.add(test.expression, function () {
                        testFunc(test.context);
                    },
                    { 'async': true, 'queued': true, 'minSamples': 100});
            }


            return test;
        };

        self.shouldEqual = function (shouldEqual) {
            self.shouldEqualValue = shouldEqual;
            return self;
        };

        self.compareBenchmarks = function () {
            var func = function (c, tc) {
                return c[tc]();
            };
            for (var testcase in this.suiteModel.codeModel.jsContext) {
                if (typeof this.suiteModel.codeModel.jsContext[testcase] === 'function') {
                    self.addTestWithBenchmarks(self.shouldEqualValue, func, testcase, false, '');
                }
            }
            self.benchmark();

            return self;
        };

        self.benchmark = function () {
            self.suiteModel.benchmarkingEnabled(true);
            self.suiteModel.processBenchmarks();
        };


    };

    Suite.prototype.linkView = function (view){
        Suite.prototype.linkedView = view;
    };
    return Suite;
});
