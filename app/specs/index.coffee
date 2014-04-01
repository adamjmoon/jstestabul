define ['itchcork','lib/testRunner/runner','app/paths'],(itchcork, runner, pathSetup) ->
  viewModel = itchcork.suiteView
  viewModel.activate = ->
    pathSetup = require 'app/paths'
    paths = new pathSetup
      ref : '../'
    runner
      paths: paths
      withCoverage: false
    return

  return viewModel