define [
  "lib/chai"
  "lib/sinon-chai"], (chai, sinonChai) ->
    window.expect = chai.expect
    chai.use sinonChai
    chai.Assertion.includeStack = true
    chai.Assertion.addChainableMethod "you", (->
    ), ->
      this

    run = (specs, require, ItchCork,mochaDone) ->
      if window.mochaPhantomJS
        mochaPhantomJS.run()
      else
        mocha.checkLeaks()
        mocha.globals(['jQuery'])
        mocha.setup "bdd"
        mocha.reporter "html"
        try
          require specs, ->
            runner = mocha.run()
            runner.on "end", ->
              ItchCork.suiteView.stats.tests runner.total
              ItchCork.suiteView.stats.passes runner.stats.passes
              ItchCork.suiteView.stats.failures runner.stats.failures
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

                return

              mochaDone(runner.stats)

              return

            return

        catch ex
          console.log ex
      return
    return run