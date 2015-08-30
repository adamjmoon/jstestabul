
define 'jquery', ->
  return $
define 'knockout', ->
  return ko

require ['lib/coffeescript','lib/when'], (CoffeeScript, When) ->
    window.CoffeeScript = CoffeeScript
    window.When = When
    return

define (require) ->

  setup = (done) ->

    require ['lib/itchcork/itchcork'], ->
      require ["lib/sinon","lib/hammer","lib/customBindings", 'lib/testRunner/mochaRunner'], () ->

      return
    return


  return setup