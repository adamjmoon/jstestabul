define 'jquery', ->
  return $
define 'knockout', ->
  return ko

require ['lib/coffeescript','lib/amplify','lib/ace/ace','lib/js2coffee/narcissus_packed'], (CoffeeScript) ->
  window.CoffeeScript = CoffeeScript
  require ['lib/itchcork','text'], ->
    require ['lib/underscore',"json","lib/sinon","lib/modal","lib/hammer","lib/jquery.scrollTo","lib/jquery.localScroll","lib/customBindings", 'lib/testRunner/mochaRunner'], () ->
      require ["itchcork"],(ItchCork) ->
        window.ItchCork = ItchCork
        Function::inherits = (ParentClassOrObject) ->
          if ParentClassOrObject.constructor is Function

            #Normal Inheritance
            @:: = new ParentClassOrObject()
            @::constructor = this
            @::base = ParentClassOrObject::
          else

            #Pure Virtual Inheritance
            @:: = ParentClassOrObject
            @::constructor = this
            @::base = ParentClassOrObject
          this


        if !ItchCork.viewModel.processed
          $.get "/specs", (options) ->
            debugger;
            ItchCork.options.framework = options.framework
            ItchCork.options.specs = options.specs
            ItchCork.options.specsFileExt = options.specsFileExt

            $.get "/sourceList", (options) ->
              debugger;
              ItchCork.options.sourceList = options.sourceList
              ItchCork.options.sourceExt = options.sourceExt
              require [
                "durandal/system"
                "durandal/app"
                "durandal/viewLocator"], (system, app, viewLocator) ->

                  system.debug false
                  app.title = "jstestabul"

                  #specify which plugins to install and their configuration
                  app.configurePlugins
                    router: true


                  app.start().then ->

                    #Look for partial views in a 'views' folder in the root.
                    viewLocator.useConvention()

                    #Show the app by setting the root view model for our application.
                    app.setRoot "app/viewModels/shell"
                    return
                  return

              return
            return

        return
      return
    return

  return


