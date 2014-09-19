define (require) ->

  ViewModel =  require 'viewModels/viewModel'
  SpecViewModel = ->

  SpecViewModel.inherits(ViewModel)
  SpecViewModel::b = 1

  SpecViewModel::activate = ->
    debugger
    @base.activate(false)
    return

  return new SpecViewModel()