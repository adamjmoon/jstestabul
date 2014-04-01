define(function (require) {
    "use strict";
    var withCoverage = window.location.hash.indexOf("coverage") > -1;
    window.pathRef = withCoverage ? "../../" : "../";
    var pathsConfig = {
        'hammer': 'vendor/hammerjs/jquery.hammer',
        'itchcork': pathRef + 'lib/itchcork',
        'text': pathRef + 'lib/require/text',
        'durandal': pathRef + 'lib/durandal',
        'plugins': pathRef + 'lib/durandal/plugins',
        'transitions': pathRef + 'lib/durandal/transitions',
        'async': 'vendor/requirejs-async/async',
        'platform': pathRef + 'lib/platform',
        'lodash': pathRef + 'lib/lodash',
        'benchmark': pathRef + 'lib/benchmark',
        'knockoutValidation': pathRef + 'lib/knockout.validation',
        'lib': pathRef + 'lib',
        'specs': pathRef + 'specs',
        'app': pathRef + 'app'
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
    
    require(['app/start']);
});
