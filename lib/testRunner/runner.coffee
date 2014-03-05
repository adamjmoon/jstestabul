require ['lib/coffeescript'], (CoffeeScript) ->
    window.CoffeeScript = CoffeeScript
    return

define (require) ->
  require ['lib/itchcork'], ->

    define 'jquery', ->
      return $


    require ["lib/sinon","lib/hammer","lib/jquery.scrollTo","lib/jquery.localScroll","lib/customBindings", 'lib/testRunner/mochaRunner'], (CoffeeScript) ->

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



      require ["itchcork"],(ItchCork) ->
        srcList = undefined
        index = 0

        runItchCork = (specList)->
          ItchCork.suiteView.expectedSuiteCount = specList.length
          ItchCork.suiteView.done = ->
            postCoverage()
          require specList
          return


        ItchCork.suiteView.currentView "UnitTests"

        $.get "/specs", (options) ->

          if options.framework is "itchcork"
            ItchCork.suiteView.unitTestFrameworkManager.set "itchcork"
            runItchCork(options.specs)
          else if options.framework is "mocha"
            ItchCork.suiteView.unitTestFrameworkManager.set "mocha"
            mochaRunner = require('lib/testRunner/mochaRunner')
            mochaDone = (stats) ->
              postResults stats
              postCoverage()
              i = undefined
              moduleName = ""
              suite = undefined
              $.get "/sourceList", (sourceList) ->
                processSrc = (moduleName, require) ->
                  try
                    require [moduleName], (module) ->
                      if module and !window.__coverage__
                        suite = new ItchCork.Suite(moduleName, module, "mocha")
                      else
                        ItchCork.suiteView.bindView()
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
            mochaRunner(options.specs,require,ItchCork,mochaDone)
            return
        return
      return

    return
  return