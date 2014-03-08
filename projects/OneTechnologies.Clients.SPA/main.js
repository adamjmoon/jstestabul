define(function (require) {
    "use strict";
    var withCoverage = window.location.pathname.indexOf("coverage") > -1;
    window.pathRef = withCoverage ? "../../" : "../" ;
    var pathsConfig = {
        'hammer': 'vendor/hammerjs/jquery.hammer',
        'iscroll': 'vendor/iscroll/iscroll',
        'highcharts': 'vendor/highcharts/highcharts',
        'text': pathRef + 'lib/require/text',
        'durandal': pathRef + 'lib/durandal',
        'plugins': pathRef + 'lib/durandal/plugins',
        'transitions': pathRef + 'lib/durandal/transitions',
        'platform': pathRef + 'lib/platform',
        'lodash': pathRef + 'lib/lodash',
        'benchmark': pathRef + 'lib/benchmark',
        'knockout': pathRef + 'lib/knockout',
        'knockoutValidation': pathRef + 'lib/knockout.validation',
        'lib': pathRef + 'lib',
        'specs':  pathRef + 'specs'
    };

    if (!withCoverage) {
        requirejs.config({
            baseUrl: "_src",
            paths: pathsConfig
        });
    }

    else {
        requirejs.config({
            baseUrl: "_instrumented/_src",
            paths: pathsConfig
        });
    }

    require([pathRef + 'lib/when'],function(When){
        window.When = When;
        require(['ot/jsUtils', 'lib/testRunner/runner'], function () {
            ko.validation.configure({
                registerExtenders: true,
                messagesOnModified: true,
                insertMessages: true,
                parseInputAttributes: true,
                messageTemplate: null,
                decorateElementOnModified: true
            });
        });

    });

});
