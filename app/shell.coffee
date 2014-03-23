define ["plugins/router"], (router) ->
  router: router
  activate: ->
    router.map([
      {
        route: [
          ""
          "specs"
        ]
        moduleId: "app/specs/index"
        title: "Test Results"
        nav: 1
      }
      {
        route: "coverage"
        moduleId: "app/coverage/index"
        title: "Code Coverage Report"
        nav: true
      }

    ]).buildNavigationModel().mapUnknownRoutes("app/specs/index", "not-found").activate()
