define(function() {
    var benchmarkModel = function () {
        this.name = ko.observable('');
        this.expression = ko.observable('');
        this.hz = ko.observable(0);
        this.relativateMarginError = ko.observable('');
        this.timesFaster = ko.observable('pending...');
        this.slowest = ko.observable(false);
        this.fastest = ko.observable(false);
        this.iterationPerSampleCycle = ko.observable(0);
        this.numAnalysisCycles = ko.observable(0);
        this.numSampleCycles = ko.observable(0);
    };

    return benchmarkModel;
});
