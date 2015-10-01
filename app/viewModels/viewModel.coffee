define ['lib/testRunner/runner','app/paths'],(runner, pathSetup) ->
  viewModel = ->
    debugger;
    @m = ItchCork.viewModel
    return

  viewModel::activate = (withCoverage) ->
    ref = '../'
    if withCoverage
      ref = '../../'

    pathConfig = new pathSetup
      ref : ref
    debugger;
    runner
      pathConfig: pathConfig
      withCoverage: withCoverage
    return


  return viewModel