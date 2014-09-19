define (require )->
  processSrcModule = (moduleName) ->
    ex = undefined
    try
      require [moduleName], (module) ->
        suite = undefined
        suite = new ItchCork.Suite(moduleName, module)
        return

    catch _error
      ex = _error
      console.log ex
    return

  processSrc = (sourceList, done) ->

    ItchCork.viewModel.suites([])
    i=0
    while i < sourceList.length

      processSrcModule ItchCork.options.sourceList[i]
      require([ItchCork.options.sourceList[i]], (module)->
        if i is ItchCork.options.sourceList.length
          done() if done
        return
      )
      i++

    return

  return processSrc