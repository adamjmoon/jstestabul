define(function (require) {
    "use strict";
    var withCoverage = window.location.pathname.indexOf("coverage") > -1;
    window.pathRef = withCoverage ? "../../" : "../";
    var pathsConfig = {
        'hammer': 'vendor/hammerjs/jquery.hammer',
        'text': pathRef + 'vendor/require/text',
        'durandal': pathRef + 'vendor/durandal',
        'plugins': pathRef + 'vendor/durandal/plugins',
        'transitions': pathRef + 'vendor/durandal/transitions',
        'platform': pathRef + 'vendor/platform',
        'lodash': pathRef + 'vendor/lodash',
        'benchmark': pathRef + 'vendor/benchmark',
        'lib': pathRef + 'lib',
        'specs': pathRef + 'specs',
        'models': 'app/models',
        'viewModels': 'app/viewModels',
        'amplify': '../vendor/amplify'
    };

    if (!withCoverage) {
        requirejs.config({
            baseUrl: "_src",
            paths: pathsConfig
        });
    } else {
        requirejs.config({
            baseUrl: "_instrumented/_src",
            paths: pathsConfig
        });
    }

    require(['vendor/testRunner/runner'], function () {

    });

    require(['when', 'text'], function (When) {

        window.ko = ko;
        window.$ = $;
        window.When = When;

        require(['knockoutValidation', 'knockoutViewModel', 'ot/ot'], function () {

        });
    });

});