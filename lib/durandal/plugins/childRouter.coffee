define (require) ->
  Router = require "plugins/router"

  ChildRouter = ->
    @createdRouters = {}
    return

  ChildRouter::create = (vm, routes, relativeModulePath) ->
    if @createdRouters[vm.__moduleId__]?
      vm.router = @createdRouters[vm.__moduleId__]
      return

    vm.router = Router.createChildRouter()
    .makeRelative
        moduleId: relativeModulePath
        fromParent: true
    .map(routes).buildNavigationModel()

    @createdRouters[vm.__moduleId__] = vm.router

    return

  return new ChildRouter()