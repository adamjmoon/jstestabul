
define 'jquery', ->
  return $
define 'knockout', ->
  return ko

require ['lib/coffeescript'], (CoffeeScript) ->
    window.CoffeeScript = CoffeeScript
    return

define (require) ->

  setup = (done) ->

    require ['lib/itchcork/itchcork'], ->
      require ["lib/sinon","lib/hammer","lib/jquery.scrollTo","lib/jquery.localScroll","lib/customBindings", 'lib/testRunner/mochaRunner'], () ->

      return
    return


  return setup