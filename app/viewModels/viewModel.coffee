define ['lib/testRunner/runner','app/paths'],(runner, pathSetup) ->
  viewModel = ->
    @m = ItchCork.viewModel
    return

  viewModel::activate = (withCoverage) ->
    ref = '../'
    if withCoverage
      ref = '../../'

    pathConfig = new pathSetup
      ref : ref
    if !ItchCork.viewModel.processed
      runner
        pathConfig: pathConfig
        withCoverage: withCoverage
    return


  return viewModel