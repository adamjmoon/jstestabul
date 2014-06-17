define(['./Test', './SuiteModel'], function (Test, SuiteModel) {
    function Suite(moduleName, jsFunctionOrObject) {
        "use strict";
        var self = this;
        this.suiteModel = new SuiteModel();
        this.suiteModel.suiteDesc(moduleName);
        this.suiteModel.codeModel.jsFunctionOrObject(jsFunctionOrObject);
        this.suiteModel.codeModel.moduleName(moduleName);
        this.testContext = undefined;

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
            self.suiteModel.shouldShow('tests');
        };

        self.addTestWithBenchmarks = function (shouldEqual, testFunc, name, defer, describe) {
            self.testContext = self.suiteModel.codeModel.jsFunctionOrObject instanceof Function ? new self.suiteModel.codeModel.jsFunctionOrObject() : self.suiteModel.codeModel.jsFunctionOrObject;
            var test = new Test(shouldEqual, testFunc, testContext, name, describe);
            if (!defer) {
                self.processTest(test);
            }


            if (name) {
                var fn = (function (context, name) {
                    return function () {
                        context[name]();
                    };
                })(self.testContext, name);
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
            for (var testcase in self.textContext) {
                if (typeof self.testContext[testcase] === 'function') {
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
