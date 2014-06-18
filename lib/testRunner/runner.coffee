define (require) ->
  runner = (options) ->
    unless options.withCoverage
      requirejs.config
        baseUrl: "_src"
        paths: options.pathConfig.paths
    else
      debugger
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
      if window.__coverage__
        coverage = JSON.stringify(window.__coverage__.valueOf())
        $.post "/coverage",
          coverage: coverage
      return

    require ["itchcork",'lib/js2coffee/js2coffeeEditor'],(ItchCork, Js2coffeeEditor) ->
      window.editor = new Js2coffeeEditor()
      require options.pathConfig.bootstrap, ->
        debugger
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
              processSrc = (moduleName, require) ->
                try
                  require [moduleName], (module) ->
                    if module and !window.__coverage__
                      return new ItchCork.Suite(moduleName, module)

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