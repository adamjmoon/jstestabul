define (require) ->

  ViewModel =  require 'app/viewModels/viewModel'
  BenchmarksViewModel = ->

  BenchmarksViewModel.inherits(ViewModel)

  BenchmarksViewModel::activate = ->
    @base.activate()
    return
    
  return BenchmarksViewModel