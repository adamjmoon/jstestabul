define(function () {
    return function (F) {
        'use strict';
        return function () {
            var args = Array.prototype.slice.call(arguments),
                i,
                j,
                call,
                count = 0,
                matched;

            for (i = 0; i < F.calls.length; i += 1) {
                call = F.calls[i];
                matched = true;
                for (j = 0; j < args.length; j += 1) {
                    if (args[j] !== call[j]) {
                        matched = false;
                        break;
                    }
                }
                if (matched) {
                    count += 1;
                }
            }

            return count > 0;
        };
    };
});
