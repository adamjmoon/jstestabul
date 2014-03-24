var js2coffeeOptions = {}
  js2coffeeOptions.show_src_lineno = false;
  
  var TokenTooltip = ace.require("kitchen-sink/token_tooltip").TokenTooltip;

  var editorCoffee = ace.edit("editorCoffee");
  editorCoffee.getSession().setMode("ace/mode/coffee");
  editorCoffee.setFontSize(14);

  editorCoffee.commands.addCommand({
    name: 'execute',
    bindKey: "ctrl+enter",
    exec: function(editor) {
        var r;
        try {
            var r = window.eval(editor.getCopyText()||editor.getValue());
        } catch(e) {
            r = e;
        }
        console.dir(r);
    },
    readOnly: true
  });

  var editorJS = ace.edit("editorJS");
  editorJS.getSession().setMode("ace/mode/javascript");
  editorJS.setFontSize(14);

  var editMode = editorCoffee;
  var toggleMode = function() {
    if (editMode === editorCoffee) {
      editMode = editorJS;
    } else if (editMode === editorJS) {
      editMode = editorCoffee;
    }
    schedule();
  }

  editorCoffee.on('change', function(event, editor) {
    var focused = document.activeElement.parentElement;
    if (focused === editorCoffee.container) {
      editMode = editorCoffee;
      schedule();
    }
  });

  editorJS.on('change', function(event, editor) {
    var focused = document.activeElement.parentElement;
    if (focused === editorJS.container) {
      editMode = editorJS;
      schedule();
    }
  });


  var job = null;
  var schedule = function() {
    if (job != null) {
      clearTimeout(job);
    }
    return job = setTimeout(doCompile, 200);
  };

  var doCompile = function() {
    if (editMode === editorCoffee) {
      compileToJavaScript();
    } else {
      compileToCoffee();
    }
  }

  var compileToJavaScript = function() {
    try {
      var input = editorCoffee.getSession().getDocument().getValue();
      var jsOutput = CoffeeScript.compile(input, {bare: true});
      editorJS.getSession().getDocument().setValue(jsOutput);
      document.querySelector(".infobox-content").innerText = ""
      document.querySelector("#infobox").style.display = "none";
    } catch (err) {
      //console.error(err.message);
      //console.error(err.stack);
      document.querySelector(".infobox-content").innerText = err.message;
      document.querySelector("#infobox").style.display = "block";
    }
  }

  var compileToCoffee = function() {
    //TODO: check if JS is valid before compile to coffee
    try {
      var input = editorJS.getSession().getDocument().getValue();
      var coffeeOutput = js2coffee.build(input, js2coffeeOptions);
      editorCoffee.getSession().getDocument().setValue(coffeeOutput);
      document.querySelector(".infobox-content").innerText = ""
      document.querySelector("#infobox").style.display = "none";
    } catch (err) {
      //console.error(err.message);
      //console.error(err.stack);
      document.querySelector(".infobox-content").innerText = err.message;
      document.querySelector("#infobox").style.display = "block";
    }
  };

  var enableOptions = function (editors) {
    for (var i=0; i < editors.length; i++) {
      var editor = editors[i];
      editor.setTheme("ace/theme/monokai");
      editor.tokenTooltip = new TokenTooltip(editor);
      editor.setShowInvisibles(true);
      editor.renderer.setShowGutter(true);
      editor.renderer.setShowPrintMargin(false);
    }
  };

  var disableToolTips = function() {
    tooltip1 = editorCoffee.tokenTooltip;
    tooltip2 = editorJS.tokenTooltip;
    tooltip1.destroy();
    tooltip2.destroy();
  }

  var enableToolTips = function() {
    editorCoffee.tokenTooltip = new TokenTooltip(editorCoffee);
    editorJS.tokenTooltip = new TokenTooltip(editorJS);
  }

  enableOptions([editorCoffee, editorJS]);

  compileToCoffee();

 

            // Tooltips
            document.querySelector('#overlay input[name="token_highlight"]').addEventListener('click', function(e){
                var value = e.target.checked;
                if (value === true) {
                    enableToolTips();
                }
                if (value === false) {
                    disableToolTips();
                }
            });

            // js2coffee line numbers
            document.querySelector('#overlay input[name="line_numbers"]').addEventListener('click', function(e){
                var value = e.target.checked;
                js2coffeeOptions.show_src_lineno = value;
                // editorFrame.contentWindow.compileToCoffee();
            });
            // js2coffee indent
            document.querySelector('#overlay select[name="js2coffee_indent"]').addEventListener('change', function(e){
                var value = e.target.value;
                js2coffeeOptions.indent = value;
                // editorFrame.contentWindow.compileToCoffee();
            });

            // 
            var toggleEditorSettings = function(e) {
                var value = e.target.checked;
                var name = e.target.name;
                if (e.target.className.indexOf("renderer") >= 0) {
                    editorCoffee.renderer['set'+name](value);
                    editorJS.renderer['set'+name](value);
                } else {
                    editorCoffee['set'+name](value);
                    editorJS['set'+name](value);
                }
            }
            var inputs = document.querySelectorAll('#overlay input.editor');
            for (var i=0; i<inputs.length; i++) {
                inputs[i].addEventListener('click', toggleEditorSettings);
            }
            var injectVersion = function() {
                if (js2coffee !== null) {
                    var js2coffeeVersion = js2coffee.VERSION;
                    var coffeeVersion = CoffeeScript.VERSION;
                    document.querySelector("#js2coffee-version").innerText = "Js2coffee v. "+js2coffeeVersion;
                    document.querySelector("#coffeescript-version").innerText = "CoffeeScript v. "+coffeeVersion;
                } else {
                    // schedule if iframe not ready yet
                    setTimeout(injectVersion, 100);
                }
            }
            injectVersion();
  