define ->

  setup = (options) ->
    @paths =
      'knockout.validation': "#{options.ref}lib/knockout.validation",
      'knockout.viewmodel': "#{options.ref}lib/knockout.viewmodel",
      enrollModel: 'common/models/enrollModel'
      transitions: "#{options.ref}lib/durandal/transitions"
      lib: "#{options.ref}lib"
      specs: "#{options.ref}specs"
      app: "#{options.ref}app"

    @bootstrap = ["knockout.validation","knockout.viewmodel"]
    return

  return setup