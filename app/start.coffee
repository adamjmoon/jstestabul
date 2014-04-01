define 'jquery', ->
  return $
define 'knockout', ->
  return ko

require ['lib/coffeescript','lib/amplify'], (CoffeeScript) ->
    window.CoffeeScript = CoffeeScript
    return

require ['lib/itchcork'], ->
  require ["lib/sinon","lib/hammer","lib/jquery.scrollTo","lib/jquery.localScroll","lib/customBindings", 'lib/testRunner/mochaRunner'], () ->
    require ["itchcork"],(ItchCork) ->

      $.get "/specs", (options) ->
        ItchCork.options = options
        require [
          "durandal/system"
          "durandal/app"
          "durandal/viewLocator"], (system, app, viewLocator) ->

          #>>excludeStart("build", true);
          system.debug true

          #>>excludeEnd("build");
          app.title = "jstestabul"

          #specify which plugins to install and their configuration
          app.configurePlugins
            router: true


          app.start().then ->
            #Look for partial views in a 'views' folder in the root.
            viewLocator.useConvention()

            #Show the app by setting the root view model for our application.
            app.setRoot "app/shell"
            return

          return

        return
      return
    return
  return

