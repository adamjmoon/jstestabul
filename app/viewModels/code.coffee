define (require) ->

  ViewModel =  require 'app/viewModels/viewModel'

  CodeViewModel = ->
    return
  CodeViewModel.inherits(ViewModel)
  CodeViewModel::a = 1
  CodeViewModel::activate = ->
    @base.activate()
    return
    
  return new CodeViewModel()