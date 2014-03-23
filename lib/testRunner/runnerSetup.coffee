define 'jquery', ->
  return $
define 'knockout', ->
  return ko

require ['lib/coffeescript'], (CoffeeScript) ->
    window.CoffeeScript = CoffeeScript
    return

define (require) ->
  require ['lib/itchcork/itchcork'], ->
    require ["lib/sinon","lib/hammer","lib/jquery.scrollTo","lib/jquery.localScroll","lib/customBindings", 'lib/testRunner/mochaRunner'], () ->
      require ["itchcork"],(ItchCork) ->

        $.get "/specs", (options) ->
          ItchCork.options = options
          return

        return
      return
    return
  return