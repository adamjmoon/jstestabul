define (require) ->

  ViewModel =  require 'app/viewModels/viewModel'
  ResultsViewModel = ->
    return
  ResultsViewModel.inherits(ViewModel)


  ResultsViewModel::activate = ->
    ItchCork.viewModel.processed = false
    @base.activate(false)
    return
    
  return ResultsViewModel