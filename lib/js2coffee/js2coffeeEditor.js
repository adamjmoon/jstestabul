define(['lib/js2coffee/js2coffee', 'lib/js2coffee/coffee-script', 'lib/js2coffee/theme-github', 'lib/js2coffee/token_tooltip'], function () {

    var js2coffeeEditor = function () {
        var js2coffeeOptions = {};
        var editorCoffee = undefined;
        var editorJS = undefined;
        var editorJS_Session = undefined;
        var editorCoffee_Session = undefined;
        var editMode = undefined;

        var compileToJavaScript = function () {
            try {
                var input = editorCoffee.getSession().getDocument().getValue();
                var jsOutput = CoffeeScript.compile(input, {bare: true});
                editorJS_Session.getDocument().setValue(jsOutput);
                editorJS_Session.setScrollTop(0);
                if(document.querySelector(".infobox-content")){
                  document.querySelector(".infobox-content").innerText = "";
                }
                if(document.querySelector("#infobox"))
                 document.querySelector("#infobox").style.display = "none";
            } catch (err) {
                if(document.querySelector(".infobox-content"))
                   document.querySelector(".infobox-content").innerText = err.message;

                if(document.querySelector("#infobox"))
                   document.querySelector("#infobox").style.display = "block";
            }
        }

        var compileToCoffee = function () {
            try {
                var input = editorJS.getSession().getDocument().getValue();
                var coffeeOutput = Js2coffee.build(input, js2coffeeOptions);
                editorCoffee_Session.getDocument().setValue(coffeeOutput);
                editorCoffee_Session.setScrollTop(0);
                document.querySelector(".infobox-content").innerText = ""
                document.querySelector("#infobox").style.display = "none";
            } catch (err) {
                console.log(err.message);
                console.log(err.stack);
                document.querySelector(".infobox-content").innerText = err.message;
                document.querySelector("#infobox").style.display = "block";
            }
        };

        this.update = function (updatedModel) {
            editorJS_Session.getDocument().setValue(updatedModel.jsSourceStr());
            compileToCoffee();
        };

        this.init = function (model) {

            js2coffeeOptions.show_src_lineno = false;

            var TokenTooltip = ace.require("kitchen-sink/token_tooltip").TokenTooltip;

            editorCoffee = ace.edit("editorCoffee");
            editorCoffee_Session = editorCoffee.getSession();
            editorCoffee_Session.setMode("ace/mode/coffee");
            editorCoffee.setFontSize(12);

            editorCoffee.commands.addCommand({
                name: 'execute',
                bindKey: "ctrl+enter",
                exec: function (editor) {
                    var r;
                    try {
                        var r = window.eval(editor.getCopyText() || editor.getValue());
                    } catch (e) {
                        r = e;
                    }
                    console.dir(r);
                },
                readOnly: true
            });

            editorJS = ace.edit("editorJS");
            editorJS_Session = editorJS.getSession()
            editorJS_Session.setMode("ace/mode/javascript");
            editorJS.setFontSize(12);

            editorJS_Session.on('changeScrollTop', function() {
                editorCoffee_Session.setScrollTop(editorJS_Session.getScrollTop())
            });

            editorCoffee_Session.on('changeScrollTop', function() {
               editorJS_Session.setScrollTop(editorCoffee_Session.getScrollTop())
            });

            if (model && model.jsSourceStr()) {
                editorJS.getSession().getDocument().setValue(model.jsSourceStr());
                compileToCoffee();
            }


            var toggleMode = function () {
                if (editMode === editorCoffee) {
                    editMode = editorJS;
                } else if (editMode === editorJS) {
                    editMode = editorCoffee;
                }
                schedule();
            }

            editorCoffee.on('change', function (event, editor) {
                var focused = document.activeElement.parentElement;
                if (focused === editorCoffee.container) {
                    editMode = editorCoffee;
                    compileToJavaScript();
                }
            });

            editorJS.on('change', function (event, editor) {
                var focused = document.activeElement.parentElement;
                if (focused === editorJS.container) {
                    editMode = editorJS;
                    compileToCoffee()
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
                if (editMode === editorCoffee) {
                    compileToJavaScript();
                } else {
                    compileToCoffee();
                }
            }


//            ko.computed(function () {
//                if (model.coffeeSourceStr()) {
//                    compileToJavascript();
//                }
//            }).extend({
//                    throttle: 1000
//                });


            var enableOptions = function (editors) {
                for (var i = 0; i < editors.length; i++) {
                    var editor = editors[i];
                    editor.setTheme("ace/theme/monokai");
                    editor.tokenTooltip = new TokenTooltip(editor);
                    editor.setShowInvisibles(true);
                    editor.renderer.setShowGutter(true);
                    editor.renderer.setShowPrintMargin(false);
                }
            };

            var disableToolTips = function () {
                tooltip1 = editorCoffee.tokenTooltip;
                tooltip2 = editorJS.tokenTooltip;
                tooltip1.destroy();
                tooltip2.destroy();
            }

            var enableToolTips = function () {
                editorCoffee.tokenTooltip = new TokenTooltip(editorCoffee);
                editorJS.tokenTooltip = new TokenTooltip(editorJS);
            }

            enableOptions([editorCoffee, editorJS]);


//            // Tooltips
            document.querySelector('#codeEditor input[name="token_highlight"]').addEventListener('click', function (e) {
                var value = e.target.checked;
                if (value === true) {
                    enableToolTips();
                }
                if (value === false) {
                    disableToolTips();
                }
            });

            // js2coffee line numbers
            document.querySelector('#codeEditor input[name="line_numbers"]').addEventListener('click', function (e) {
                var value = e.target.checked;
                js2coffeeOptions.show_src_lineno = value;
                compileToCoffee();
            });
            // js2coffee indent
            document.querySelector('#codeEditor select[name="js2coffee_indent"]').addEventListener('change', function (e) {
                var value = e.target.value;
                js2coffeeOptions.indent = value;
                compileToCoffee();
            });

            //
            var toggleEditorSettings = function (e) {
                var value = e.target.checked;
                var name = e.target.name;
                if (e.target.className.indexOf("renderer") >= 0) {
                    editorCoffee.renderer['set' + name](value);
                    editorJS.renderer['set' + name](value);
                } else {
                    editorCoffee['set' + name](value);
                    editorJS['set' + name](value);
                }
            }

        };

    };
    return js2coffeeEditor;
});
