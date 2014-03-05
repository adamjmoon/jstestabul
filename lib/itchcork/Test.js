define(function () {

    var test = function (shouldEqual, testExp, ctx, testName, describe) {
        'use strict';

        if(typeof testExp === "string")
        {
            testExp = new Function(ctx,"return(" + testExp + ");");
        }
        var expressionStr = typeof testExp === "function" ? testExp.toString().trim() : "", self = this;
        this.context = ctx;
        this.passed = false;
        this.describe = describe;
        if (testName) {
            this.expression = testName + '()';
            this.actual = typeof testExp === "function" ? testExp(this.context, testName) : testExp;


        } else {
            this.expression = expressionStr.replace(/\n/gm, '')
                .replace(/function +?\(c\) +?\{+?return(.*?)\;+?\}/g, '$1')
                .replace(/function +?\(c\) +?\{ +?return(.*?)\; +?\}/g, '$1');



            this.actual = typeof testExp === "function" ? testExp(this.context) : testExp;
        }
        this.shouldEqual = shouldEqual;

        this.typeOf = typeof(this.actual);

        this.run = function () {
            self.passed = self.shouldEqual === self.actual;
            return self.passed;
        };
    };

    return test;
});
