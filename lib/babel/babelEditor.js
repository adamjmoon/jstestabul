define(function (require) {
    require('lib/ace/ext-settings_menu');
    require("lib/ace/ext-static_highlight");
    require("lib/ace/mode-coffee");
    require("lib/ace/mode-javascript");
    require('lib/ace/token_tooltip');
    require('lib/ace/ext-language_tools');
    require('lib/ace/ext-themelist');
    require('lib/ace/ext-searchbox');
    require('lib/ace/ext-keybinding_menu');
    require('lib/ace/ext-beautify');
    require('lib/ace/theme-cobalt');
    require('lib/ace/theme-github');
    require('lib/ace/theme-kuroir');
    require('lib/ace/theme-twilight');

    var babel = require('lib/babel/babel');
    var babelEditor = function () {
        var babelOptions = {
            experimental: true,
            loose: true,
            spec: false,
            evaluate: false
        };
        var editorES6 = undefined;
        var editorES5 = undefined;
        var editorES5_Session = undefined;
        var editorES6_Session = undefined;
        var editMode = undefined;
        this.selectedCodeTheme = new ko.observable("terminal");
        this.model = undefined;

        var compile = function () {
            try {

                var code = editorES6.getSession().getDocument().getValue();
                debugger;
                transformed = code;
                //var transformed = babel.transform(code, {
                //    stage: babelOptions.experimental ? 0 : 2,
                //    loose: babelOptions.loose && "all",
                //    optional: babelOptions.spec && ["es6.spec.templateLiterals", "es6.spec.blockScoping", "es6.spec.symbols"],
                //    filename: 'repl'
                //});

                editorES5_Session.getDocument().setValue(transformed);

                if (document.querySelector(".infobox-content")) {
                    document.querySelector(".infobox-content").innerText = "";
                }
                if (document.querySelector("#infobox"))
                    document.querySelector("#infobox").style.display = "none";

                editorES5_Session.setScrollTop(0);
                editorES5_Session.setScrollLeft(0);

            } catch (err) {
                console.log(err.message);
                console.log(err.stack);
                if (document.querySelector(".infobox-content"))
                    document.querySelector(".infobox-content").innerText = err.message;

                if (document.querySelector("#infobox"))
                    document.querySelector("#infobox").style.display = "block";
            }
        }
        this.save = (function (_this) {
            return function (ext, editor) {
                var moduleInfo = {
                    name: _this.model.moduleName(),
                    type: _this.model.moduleName().indexOf('specs') > -1 ? 'spec' : 'code',
                    ext: ext,
                    code: editor.getSession().getDocument().getValue()
                };
                _this.model.sourceStr(editorES6.getSession().getDocument().getValue())
                $.post("/saveModule", {
                    moduleInfo: JSON.stringify(moduleInfo)
                }, function () {

                });
            };

        })(this);


        this.update = (function (_this) {
            return function (updatedModel) {
                debugger;
                _this.model = updatedModel;
                if (updatedModel.sourceStr().length > 0) {

                    editorES6_Session.getDocument().setValue(updatedModel.sourceStr());
                } else {
                    editorES5_Session.getDocument().setValue(updatedModel.compiledSourceStr());
                    //  compileToCoffee();
                }
            };
        })(this);

        this.init = (function (_this) {
            return function (model) {

                var TokenTooltip = ace.require("lib/ace/token_tooltip").TokenTooltip;
                ace.require("lib/ace/ext-language_tools");

                editorES6 = ace.edit("editorSource");
                editorES6.setOptions({
                    enableBasicAutocompletion: true
                });

                editorES6_Session = editorES6.getSession();
                editorES6_Session.setTabSize(2);
                editorES6_Session.setMode("ace/mode/javascript");
                editorES6.setFontSize(12);
                ace.require('ace/ext/settings_menu').init(editorES6);


                editorES6.commands.addCommand({
                    name: 'toggle module list',
                    bindKey: "alt+1",
                    exec: function (editor) {
                        if ($("#suite-list:visible").length > 0) {
                            $("#suite-list").hide();
                            $("#suite-selected").removeClass("col-md-9").removeClass("col-lg-10").addClass("col-md-12");
                        }
                        else {
                            $("#suite-list:hidden").show();
                            $("#suite-selected").removeClass("col-md-12").addClass("col-lg-10").addClass("col-md-9");
                        }

                    },
                    readOnly: false
                });

                editorES6.commands.addCommand({
                    name: 'save module',
                    bindKey: "alt+s",
                    exec: function (editor) {
                        _this.save('.es6', editor);
                    },
                    readOnly: false
                });


                editorES6.commands.addCommands([
                    {
                        name: "showSettingsMenu",
                        bindKey: {win: "alt-q", mac: "Command-q"},
                        exec: function (editor) {
                            editor.showSettingsMenu();
                        },
                        readOnly: true
                    }
                ]);


                editorES5 = ace.edit("editorCompiled");
                editorES5_Session = editorES5.getSession()
                editorES5_Session.setTabSize(2);
                editorES5_Session.setMode("ace/mode/javascript");
                editorES5.setFontSize(12);

//                editorJS_Session.on('changeScrollTop', function () {
//                    editorCoffee_Session.setScrollTop(editorJS_Session.getScrollTop())
//                });
//
//                editorCoffee_Session.on('changeScrollTop', function () {
//                    editorJS_Session.setScrollTop(editorCoffee_Session.getScrollTop())
//                });

                editorES5.commands.addCommand({
                    name: 'save module',
                    bindKey: "alt+s",
                    exec: function (editor) {
                        _this.save('.js', editor);
                    },
                    readOnly: false
                });


                editorES6.on('change', function (event, editor) {
                    var focused = document.activeElement.parentElement;
                    if (focused === editorES6.container) {
                        editMode = editorES6;
                        compile();
                    }
                });

                var job = null;
                var schedule = function () {
                    if (job != null) {
                        clearTimeout(job);
                    }
                    return job = setTimeout(doCompile, 200);
                };

                var doCompile = function () {
                    compile();
                };

                var enableOptions = function (editors) {
                    for (var i = 0; i < editors.length; i++) {
                        var editor = editors[i];
                        editor.setTheme("ace/theme/terminal");

                        editor.tokenTooltip = new TokenTooltip(editor);
                        editor.setShowInvisibles(false);
                        editor.renderer.setShowGutter(true);
                        editor.renderer.setShowPrintMargin(false);
                    }
                };

                var disableToolTips = function () {
                    tooltip1 = editorES6.tokenTooltip;
                    tooltip2 = editorES5.tokenTooltip;
                    tooltip1.destroy();
                    tooltip2.destroy();
                };

                var enableToolTips = function () {
                    editorES6.tokenTooltip = new TokenTooltip(editorES6);
                    editorES5.tokenTooltip = new TokenTooltip(editorES5);
                };

                enableOptions([editorES6, editorES5]);

                _this.model = model;
                debugger;
                //editorES6.getSession().getDocument().setValue(model.sourceStr().trim());
                //compile();
                //
                //editorES5.getSession().getDocument().setValue(model.compiledSourceStr().trim());

            };

        })(this);
    };

    return babelEditor;

});


//(function(babel, $, _, ace, window) {
//
//  /* Throw meaningful errors for getters of commonjs. */
//  ["module", "exports", "require"].forEach(function(commonVar){
//    Object.defineProperty(window, commonVar, {
//      configurable: true,
//      get: function () {
//        throw new Error(commonVar + " is not supported in the browser, you need a commonjs environment such as node.js/io.js, browserify/webpack etc");
//      }
//    });
//  });
//
//  /*
//   * Utils for working with the browser's URI (e.g. the query params)
//   */
//  function UriUtils () {}
//
//  UriUtils.encode = function (value) {
//    return window.encodeURIComponent(value);
//  };
//
//  UriUtils.decode = function (value) {
//    try {
//      return window.decodeURIComponent('' + value);
//    } catch (err) {
//      return value;
//    }
//  };
//
//  UriUtils.parseQuery = function () {
//    var query = window.location.hash.replace(/^\#\?/, '');
//
//    if (!query) {
//      return null;
//    }
//
//    return query.split('&').map(function(param) {
//      var splitPoint = param.indexOf('=');
//
//      return {
//        key : param.substring(0, splitPoint),
//        value : param.substring(splitPoint + 1)
//      };
//    }).reduce(function(params, param){
//      if (param.key && param.value) {
//        params[param.key] = UriUtils.decode(param.value);
//      }
//      return params;
//    }, {});
//  };
//
//  UriUtils.updateQuery = function (object) {
//    var query = Object.keys(object).map(function(key){
//      return key + '=' + UriUtils.encode(object[key]);
//    }).join('&');
//
//    window.location.hash = '?' + query;
//  };
//
//  /*
//   * Long term storage for persistence of state/etc
//   */
//  function StorageService () {
//    this.store = window.localStorage;
//  }
//
//  StorageService.prototype.get = function (key) {
//    try {
//      return JSON.parse(this.store.getItem(key));
//    } catch(e) {}
//  };
//
//  StorageService.prototype.set = function (key, value) {
//    try {
//      this.store.setItem(key, JSON.stringify(value));
//    } catch(e) {}
//  };
//
//  /*
//   * Decorating the ACE editor
//   */
//  function Editor(selector) {
//    this.$el = $(selector);
//    this.editor = ace.edit(this.$el[0]);
//    this.session = this.editor.getSession();
//    this.document = this.session.getDocument();
//
//    this.editor.setTheme('ace/theme/tomorrow');
//    this.editor.setShowPrintMargin(false);
//    this.$el.css({
//      fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
//      lineHeight: 'inherit'
//    });
//
//    this.session.setMode('ace/mode/javascript');
//    this.session.setUseSoftTabs(true);
//    this.session.setTabSize(2);
//    this.session.setUseWorker(false);
//
//    this.editor.setOption('scrollPastEnd', 0.33);
//  }
//
//  /*
//   * Options exposed for the REPL that will influence Babel's transpiling
//   */
//  function $checkbox($element){
//    return {
//      get: function () {
//        return $element.is(":checked");
//      } ,
//      set: function (value) {
//        var setting = value !== 'false' && value !== false;
//        $element.prop('checked', setting);
//      },
//      enumerable: true,
//      configurable: false
//    };
//  }
//
//  /*
//   * Babel options for transpilation as used by the REPL
//   */
//  function Options () {
//    var $experimental = $('#option-experimental');
//    var $evaluate = $('#option-evaluate');
//    var $loose = $('#option-loose-mode');
//    var $spec = $('#option-spec');
//
//    var options = {};
//    Object.defineProperties(options, {
//      'experimental': $checkbox($experimental),
//      'evaluate': $checkbox($evaluate),
//      'loose': $checkbox($loose),
//      'spec': $checkbox($spec)
//    });
//
//    // Merge in defaults
//    var defaults = {
//      experimental : true,
//      loose : false,
//      spec : false,
//      evaluate : true
//    };
//
//    _.assign(options, defaults);
//
//    return options;
//  }
//
//  /*
//   * Babel Web REPL
//   */
//  function REPL () {
//    this.storage = new StorageService();
//    var state = this.storage.get('replState') || {};
//    _.assign(state, UriUtils.parseQuery());
//
//    this.options = _.assign(new Options(), state);
//
//    this.input = new Editor('.babel-repl-input .ace_editor').editor;
//    this.input.setValue(UriUtils.decode(state.code || ''));
//
//    this.output = new Editor('.babel-repl-output .ace_editor').editor;
//    this.output.setReadOnly(true);
//    this.output.setHighlightActiveLine(false);
//    this.output.setHighlightGutterLine(false);
//
//    this.$errorReporter = $('.babel-repl-errors');
//    this.$consoleReporter = $('.babel-repl-console');
//    this.$toolBar = $('.babel-repl-toolbar');
//  }
//
//  REPL.prototype.clearOutput = function () {
//    this.$errorReporter.text('');
//    this.$consoleReporter.text('');
//  };
//
//  REPL.prototype.setOutput = function (output) {
//    this.output.setValue(output, -1);
//  };
//
//  REPL.prototype.printError = function (message) {
//    this.$errorReporter.text(message);
//  };
//
//  REPL.prototype.getSource = function () {
//    return this.input.getValue();
//  };
//
//  REPL.prototype.compile = function () {
//
//    var transformed;
//    var code = this.getSource();
//    this.clearOutput();
//
//    try {
//      transformed = babel.transform(code, {
//        stage: this.options.experimental ? 0 : 2,
//        loose: this.options.loose && "all",
//        optional: this.options.spec && ["es6.spec.templateLiterals", "es6.spec.blockScoping", "es6.spec.symbols"],
//        filename: 'repl'
//      });
//    } catch (err) {
//      this.printError(err.message);
//      throw err;
//    }
//
//    this.setOutput(transformed.code);
//
//    if (this.options.evaluate) {
//      this.evaluate(transformed.code);
//    }
//  };
//
//  var capturingConsole;
//  REPL.prototype.evaluate = function(code) {
//    capturingConsole = Object.create(console);
//    var $consoleReporter = this.$consoleReporter;
//    var buffer = [];
//    var error;
//    var done = false;
//
//    function flush() {
//      $consoleReporter.text(buffer.join('\n'));
//    }
//
//    function write(data) {
//      buffer.push(data);
//      if (done) flush();
//    }
//
//    capturingConsole.clear = function() {
//      buffer = [];
//      flush();
//    };
//
//    capturingConsole.error = function () {
//      error = true;
//      capturingConsole.log.apply(capturingConsole, arguments);
//    };
//
//    capturingConsole.log =
//    capturingConsole.info =
//    capturingConsole.debug = function() {
//      if (this !== capturingConsole) { return; }
//
//      var args = Array.prototype.slice.call(arguments);
//      Function.prototype.apply.call(console.log, console, args);
//
//      var logs = args.reduce(function (logs, log) {
//        if (typeof log === 'string') {
//          logs.push(log);
//        } else if (log instanceof Function) {
//          logs.push(log.toString());
//        } else {
//          logs.push(JSON.stringify(log));
//        }
//        return logs;
//      }, []);
//
//      write(logs.join(' '));
//    };
//
//    try {
//      new Function('console', code)(capturingConsole);
//    } catch (err) {
//      error = err;
//      buffer.push(err.message);
//    }
//
//    done = true;
//    flush();
//
//    if (error) throw error;
//  };
//
//  REPL.prototype.persistState = function (state) {
//    UriUtils.updateQuery(state);
//    this.storage.set('replState', state);
//  };
//
//  /*
//   * Initialize the REPL
//   */
//  var repl = new REPL();
//
//  function onSourceChange () {
//    var error;
//    try {
//      repl.compile();
//    } catch(err) {
//      error = err;
//    }
//    var code = repl.getSource();
//    var state = _.assign(repl.options, {
//      code: code
//    });
//    repl.persistState(state);
//    if (error) throw error;
//  }
//
//  repl.input.on('change', _.debounce(onSourceChange, 500));
//  repl.$toolBar.on('change', onSourceChange);
//
//  repl.compile();
//
//
//
//}(babel, $, _, ace, window));/**
// * Created by amoon on 8/28/2015.
// */
