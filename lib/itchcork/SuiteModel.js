define(['lodash','benchmark','./BenchmarkModel', './CodeModel'], function (_,Benchmark,BenchmarkModel, CodeModel) {
    var SuiteModel = function (name) {
        var self = this;
        self.passedCount = new ko.observable(0), self.failedCount = new ko.observable(0);
        this.suiteDesc = name;
        this.tests = new ko.observableArray();
        this.shouldShow = new ko.observable('codeEditor');
        this.benchmarks = new ko.observableArray();
        this.benchmarksDone = new ko.observable(false);
        this.benchmarkPlatform = new ko.observable('');
        this.benchmarkSuite = new Benchmark.Suite();
        this.benchmarkPlatform(Benchmark.platform.description);
        this.benchmarkingEnabled = new ko.observable(false);
        this.codeModel = new CodeModel(name);

        this.processBenchmarks = function () {
            self.benchmarksDone(false);
            self.benchmarks([]);
            self.runBenchmarks();
        }

        this.runBenchmarks = function () {
            while (self.benchmarks().length > 0) {
                self.benchmarks.pop();
            }
            self.benchmarkSuite.on('cycle', function (event) {
                var b = event.target;

                var bm = new BenchmarkModel();
                bm.name(b.name);
                bm.expression(b.name);
                bm.hz(b.hz.toFixed(0));
                bm.relativateMarginError(b.stats.rme.toFixed(2) + '%');
                bm.iterationPerSampleCycle(b.count);
                bm.numAnalysisCycles(b.cycles);
                bm.numSampleCycles(b.stats.sample.length);

                self.benchmarks.push(bm);
            })
                .on('complete', function () {

                    self.benchmarks.sort(function (left, right) {
                        var leftHz = parseInt(left.hz());
                        var rightHz = parseInt(right.hz());
                        return leftHz == rightHz ? 0 : (leftHz > rightHz ? -1 : 1)
                    });
                    self.benchmarks()[0].fastest(true);
                    var length = self.benchmarks().length;
                    self.benchmarks()[length - 1].slowest(true);
                    var slowestHz = self.benchmarks()[length - 1].hz();
                    for (var i = 0; i < length; i++) {
                        self.benchmarks()[i].timesFaster((self.benchmarks()[i].hz() / slowestHz).toFixed(3));
                    }
                    self.benchmarksDone(true);
                });


            self.benchmarkSuite.run();
        };


    };

    return SuiteModel;
});