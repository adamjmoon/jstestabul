define (require) ->

  ViewModel =  require 'app/viewModels/viewModel'
  CoverageViewModel = ->

  CoverageViewModel.inherits(ViewModel)
  CoverageViewModel::c = 1

  CoverageViewModel::activate = ->
    ItchCork.viewModel.processed = false
    @base.activate(true)
    return
    
  return new CoverageViewModel()