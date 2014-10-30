define (require) ->

  ViewModel =  require 'app/viewModels/viewModel'
  SpecViewModel = ->

  SpecViewModel.inherits(ViewModel)
  SpecViewModel::b = 1

  SpecViewModel::activate = ->
    @base.activate(false)
    return

  return new SpecViewModel()