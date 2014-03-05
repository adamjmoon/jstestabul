(function(){
    window.onerror = null;
    window.onerror = function (message, url, linenumber, columnNumber, errorObj) {
        var error = {
            message: message,
            context: [
                {key: "line", value: linenumber},
                {key: "column", value: columnNumber},
                {key: "file", value: url},
                {key: "url", value: window.location.href},
                {key: "userAgent", value: window.navigator.userAgent},
                {key: "stackTrace", value: errorObj !== null && errorObj !== undefined ? errorObj.stack : ''}
            ]
        };
        var errorMsg = message +
                        "\n line: " + linenumber +
                        "\n column: " + columnNumber +
                        "\n file: " + url +
                        "\n url: " + window.location.href +
                        "\n user agent: " + window.navigator.userAgent;
        if(errorObj !== undefined && errorObj !== null){
            errorMsg += "\n stack trace: " + errorObj.stack;
        }
        console.log(errorMsg);

    };
})();