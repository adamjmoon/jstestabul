define (require )->
  processSpecModule = (moduleName, require) ->
    ex = undefined
    try

      $.get("/absolute/" +  moduleName + ItchCork.options.specsFileExt).done((data) ->
       ItchCork.codeProcessor.process new ItchCork.SpecModel(moduleName), "", (specModel) ->

          ItchCork.viewModel.specs.push specModel
          ItchCork.viewModel.selectedSpecModel specModel  if typeof ItchCork.viewModel.selectedSpecModel isnt "undefined"
          return
      )

    catch _error
      ex = _error
      console.log ex
    return

  processSpecs = (specList, done) ->
    ItchCork.viewModel.specs([])
    i = 0
    while i < specList.length
      processSpecModule specList[i].replace('.js',''), require
      i++
      if i is specList.length
        done() if done
    return

  return processSpecs