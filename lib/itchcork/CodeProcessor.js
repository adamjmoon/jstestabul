define(['./ToSource', 'lib/when', 'require']
    , function (ToSource, when, require) {

        function CodeProcessor() {
            this.currentTheme = new ko.observable();

//
//            this.codeHighlighter = require("lib/ace/ext/static_highlight");

            this.themeOptions = [];




            this.buildPropertyList = (function (_this) {
                return function (context, codeModel, proto, done) {

                    var jsStr = '', coffeeStr = '', prop, property;
                    try {
                        if (context && typeof context !== "string") {

                            Object.keys(context).forEach(function (prop) {
                                if (prop !== "__moduleId__") {
                                    if (context[prop] instanceof Function) {
                                        jsStr = context[prop].toString();
                                        try {
                                            coffeeStr = Js2coffee.build(jsStr);
                                            property = { name: (proto ? 'prototype.' : '') + prop + '()', jsStr: _this.highlight(jsStr, _this.javascriptMode), coffeeStr: _this.highlight(coffeeStr, _this.coffeeMode)};
                                            codeModel.properties.push(property);
                                        } catch (err) {
                                            property = { name: (proto ? 'prototype.' : '') + prop + '()', jsStr: _this.highlight(jsStr, _this.javascriptMode), coffeeStr: ''};
                                            codeModel.properties.push(property);
                                        }

                                    } else {
                                        var objSrc = ToSource(context[prop]);
                                        objSrc = prop + ' = ' + objSrc
                                        property = {  name: (proto ? 'prototype.' : '') + prop, jsStr: _this.highlight(objSrc.replace(prop + ' = ', ''), _this.javascriptMode), coffeeStr: _this.highlight(Js2coffee.build(objSrc).replace(prop + ' = ', '').replace(prop + ' =\n', ''), _this.coffeeMode)};
                                        codeModel.properties.push(property);
                                    }
                                }
                            });

                            if (!proto && context.prototype) {
                                this.buildPropertyList(context.prototype, codeModel, true, done);
                            }
                            else {
                                done();
                            }
                        }
                    }
                    catch (ex) {
                        debugger;
                        done();
                    }

                }
            })(this);


            this.highlight = (function (_this) {
                return function (code, mode) {
                    var highlighted = _this.codeHighlighter.render(code, mode, _this.currentTheme());

                    _this.dom.importCssString(highlighted.css, "ace_highlight");

                    return highlighted.html;
                };
            })(this);

            this.process = (function (_this) {
                return function (codeModel, root, thenAction) {
                    $.get(root + codeModel.moduleName() + '.coffee').done(function (coffeeStr) {
                        codeModel.coffeeSourceStr(coffeeStr);
                        thenAction(codeModel);

                    }).fail(function (error) {
                        console.log(error);
                        $.get(root + codeModel.moduleName() + '.js').done(function (jsStr) {

                            codeModel.jsSourceStr(jsStr.trim());
                            thenAction(codeModel);
                            return true;
                        }).fail(function () {
                            codeModel.jsSourceStr(ToSource(context));
                            thenAction(codeModel);
                        });

                    });

                    return true;
                };
            })(this);
        }


        return CodeProcessor;
    })
;