define ['itchcork','lib/testRunner/runner','app/paths'],(itchcork, runner, pathSetup) ->
  viewModel = itchcork.suiteView
  viewModel.activate = ->
    pathConfig = new pathSetup
      ref : '../'
    runner
      pathConfig: pathConfig
      withCoverage: false
    return

  return viewModel