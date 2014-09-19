define ["plugins/router",'lib/ThemeManager',"app/viewModels/results","app/viewModels/specs","app/viewModels/code"], (router,ThemeManager) ->
  router: router
  activate: ->
    router.map([
        {route: ["","results"],moduleId: "app/viewModels/results",title: "Results",nav: true},
        {route: "specs",moduleId: "app/viewModels/specs",title: "Specs",nav: true},
        {route: "code",moduleId: "app/viewModels/code",title: "Code",nav: true},
        {route: "benchmarks",moduleId: "app/viewModels/benchmarks",title: "Benchmarks",nav: true},
        {route: "coverage",moduleId: "app/viewModels/coverage", title: "Coverage",nav: true}
    ]
    ).buildNavigationModel()
     .activate({_wantsPushState: true})
    return
