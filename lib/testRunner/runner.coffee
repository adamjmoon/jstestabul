define (require) ->
  runner = undefined
  runner = (options) ->
    $.ajaxSetup({ cache: false })
    postCoverage = undefined
    postResults = undefined
    unless options.withCoverage
      requirejs.config
        baseUrl: "absolute"
        paths: options.pathConfig.paths

    else
      requirejs.config
        baseUrl: "_instrumented/_src"
        paths: options.pathConfig.paths

    window.require = require

    postResults = (stats, callback) ->
      $.post "/stats",
        stats: JSON.stringify(stats)
      , ->
        callback()  if callback
        return

      return

    postCoverage = ->
      coverage = undefined
      if window.__coverage__
        coverage = JSON.stringify(window.__coverage__.valueOf())
        $.post "/coverage",
          coverage: coverage

      return

    require [

      "lib/testRunner/processSource"
      "lib/testRunner/processSpecs"

    ], (ProcessSource,ProcessSpecs) ->

      options.pathConfig.mock() if options.pathConfig.mock
      require options.pathConfig.bootstrap, ->

        unless ItchCork.viewModel.processed

          ProcessSpecs(ItchCork.options.specs, ->
            mochaDone = undefined
            mochaRunner = undefined

            if ItchCork.options.framework is "itchcork"
              ItchCork.viewModel.unitTestFrameworkManager.set "itchcork"
              ItchCork.on.end = ->
                postCoverage()
                postResults ItchCork.stats
                return

              ItchCork.run()
            else if ItchCork.options.framework is "mocha"
              ItchCork.viewModel.unitTestFrameworkManager.set "mocha"
              mochaRunner = require("lib/testRunner/mochaRunner")
              mochaDone = (stats) ->
                postResults stats
                ProcessSource ItchCork.options.sourceList, ->
                  if options.withCoverage
                    postCoverage()
                  ItchCork.viewModel.processed = true
                  return
                return
            mochaRunner ItchCork.options.specs, require, ItchCork, mochaDone
          )
        return

      return

    return

  runner
