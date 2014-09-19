define [
  "lib/chai"
  "lib/sinon-chai"], (chai, sinonChai) ->
    window.expect = chai.expect
    chai.use sinonChai
    chai.Assertion.includeStack = true
    chai.Assertion.addChainableMethod "you", (->
    ), ->
      this

    startMocha = (mochaDone, ItchCork) ->
      runner = mocha.run()
      runner.on "end", ->
        ItchCork.viewModel.stats.tests runner.total
        ItchCork.viewModel.stats.passes runner.stats.passes
        ItchCork.viewModel.stats.failures runner.stats.failures
        $("#mocha a").attr "href", "#"
        $("#mocha code").addClass "well"
        $("#mocha a").click ->
          tests = Array::slice.call($(this).parent().siblings()[0].children)
          tests.forEach (test) ->
            if test.hidden
              test.hidden = false
            else
              test.hidden = true
            return
        mochaDone(runner.stats)
        return
      return

    run = (specs, require, ItchCork,mochaDone) ->

      if window.mochaPhantomJS
        mochaPhantomJS.run()
      else
        mocha.checkLeaks()
        mocha.globals(['jQuery'])
        mocha.setup "bdd"
        mocha.reporter "html"
        mochaStarted = false
        i=0
        callbackCount=0
        errorCount=0
        while i<specs.length
          j=i
          require [specs[i]],((spec) ->
            callbackCount++
            unless callbackCount isnt specs.length - errorCount
              startMocha(mochaDone, ItchCork)
            return
          )
          i++
      return
    return run