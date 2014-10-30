define (require )->
  processSrcModule = (moduleName, callback) ->
    ex = undefined
    try
      if requirejs.defined ItchCork.options.sourceList[i]
        requirejs.undef ItchCork.options.sourceList[i]
      require [moduleName], (module) ->
        new ItchCork.Suite(moduleName, module)
        callback()
        return

    catch _error
      ex = _error
      new ItchCork.Suite(moduleName, null)
      console.log ex
    return

  processSrc = (sourceList, done) ->

    $("input").on "keydown", (evt) ->
      $this = $(this)
      size = parseInt($this.attr("size"))
      if evt.which is 8

        # backspace
        $this.attr "size", size - 1
      else

        # all other keystrokes
        $this.attr "size", size + 1


    ItchCork.viewModel.code([])
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