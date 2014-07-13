define (require) ->
  runner = (options) ->
    unless options.withCoverage
      requirejs.config
        baseUrl: "_src"
        paths: options.pathConfig.paths
    else
      requirejs.config
        baseUrl: "_instrumented/_src"
        paths: options.pathConfig.paths

    postResults = (stats, callback) ->
      $.post "/stats",
        stats: JSON.stringify(stats)
      , ->
        callback()  if callback
        return
      return
    postCoverage = ->
      debugger
      if window.__coverage__
        coverage = JSON.stringify(window.__coverage__.valueOf())
        $.post "/coverage",
          coverage: coverage
      return

    require ["itchcork",'lib/js2coffee/js2coffeeEditor','lib/typeahead.bundle.min'],(ItchCork, Js2coffeeEditor) ->
      window.editor = new Js2coffeeEditor()
      require options.pathConfig.bootstrap, ->
        if ItchCork.options.framework is "itchcork"
          ItchCork.suiteView.unitTestFrameworkManager.set "itchcork"
          ItchCork.on.end = ->
            postCoverage()
            postResults ItchCork.stats
            return
          ItchCork.run()

        else if ItchCork.options.framework is "mocha"
          ItchCork.suiteView.unitTestFrameworkManager.set "mocha"
          mochaRunner = require('lib/testRunner/mochaRunner')
          mochaDone = (stats) ->
            postResults stats
            postCoverage()
            i = undefined
            suite = undefined
            $.get "/sourceList", (sourceList) ->

              # setup typeahead input for sourceList
              bloodHoundOptions =
                datumTokenizer : (d) ->
                  Bloodhound.tokenizers.whitespace d.tokens.join("/ ")
                queryTokenizer : Bloodhound.tokenizers.whitespace
                limit: 10
                # `items` is an array defined in "The Basics"
                local : $.map( sourceList , ( moduleName ) ->

                  {value: moduleName, tokens: moduleName.split("/")}
                )
              
              modules = new Bloodhound(bloodHoundOptions)

              modules.initialize()
              $( "#bloodhound .typeahead" ).typeahead(
                  hint : true
                  highlight : true
                  minLength : 1
                ,
                  name : "modules"
                  displayKey : "value"
                  source : modules.ttAdapter()
              ).on('typeahead:selected', ($e, datum) ->
                suiteLinkId = "#{datum['value']}"
                suiteLink = document.getElementById(suiteLinkId)
                suiteLink.children[0].click() if suiteLink.children
                return
              )
              processSrc = (moduleName, require) ->
                try
                  require [moduleName], (module) ->
                    if !window.__coverage__
                      suite = new ItchCork.Suite(moduleName, module)

                    return

                catch ex
                  console.log ex
                return
              i = 0
              while i < sourceList.length
                processSrc sourceList[i], require
                i++
              return
            return
          mochaRunner(ItchCork.options.specs,require,ItchCork,mochaDone)
        return
      return
    return
  return runner