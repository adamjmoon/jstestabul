define(function () {
    "use strict";
    return function (F) {
        function G() {
            var args = Array.prototype.slice.call(arguments);
            G.calls.push(args);
            F.apply(this, args);
        }

        G.prototype = F.prototype;
        G.calls = [];

        return G;
    };
});