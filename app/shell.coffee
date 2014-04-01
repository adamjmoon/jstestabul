define ["plugins/router",'lib/ThemeManager'], (router,ThemeManager) ->
  router: router
  activate: ->
    router.map([
        {route: ["","specs"],moduleId: "app/specs/index",title: "Specs",nav: 1},
        {route: "coverage",moduleId: "app/coverage/index", title: "Coverage",nav: true}
    ]
    ).buildNavigationModel()
      .mapUnknownRoutes('app/specs/index', '')
      .activate()
    return
