define ->

  setup = (options) ->
    @paths =
      'knockout.validation': "#{options.ref}lib/knockout.validation",
      'knockout.viewmodel': "#{options.ref}lib/knockout.viewmodel",
      enrollModel: "#{options.ref}/_src/common/models/enrollModel"
      transitions: "#{options.ref}lib/durandal/transitions"
      lib: "#{options.ref}lib"
      specs: "#{options.ref}specs"
      app: "#{options.ref}app"

    @bootstrap = []
    return

  return setup