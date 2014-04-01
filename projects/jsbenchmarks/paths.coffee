define (require) ->

  setup = (options) ->
    paths =
      hammer: "vendor/hammerjs/jquery.hammer"
      itchcork: options.ref + "lib/itchcork"
      text: options.ref + "lib/require/text"
      durandal: options.ref + "lib/durandal"
      plugins: options.ref + "lib/durandal/plugins"
      transitions: options.ref + "lib/durandal/transitions"
      async: "vendor/requirejs-async/async"
      platform: options.ref + "lib/platform"
      lodash: options.ref + "lib/lodash"
      benchmark: options.ref + "lib/benchmark"
      knockoutValidation: options.ref + "lib/knockout.validation"
      lib: options.ref + "lib"
      specs: options.ref + "specs"
      app: options.ref + "app"
    return paths

  return setup