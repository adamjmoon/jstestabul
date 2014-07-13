define ->
  setup = (options) ->
    @paths =
      transitions: "#{options.ref}lib/durandal/transitions"
      lib: "#{options.ref}lib"
      specs: "#{options.ref}specs"
      app: "#{options.ref}app"

    @ext = ".coffee"
    return

  return setup