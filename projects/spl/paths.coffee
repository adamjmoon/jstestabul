define ->

  setup = (options) ->
    @paths =
      'knockout.validation': "#{options.ref}lib/knockout.validation",
      'knockout.viewmodel': "#{options.ref}lib/knockout.viewmodel",
      clientEnrollModel: "#{options.ref}/_src/common/models/clientEnrollModel"
      transitions: "#{options.ref}lib/durandal/transitions"
      lib: "#{options.ref}lib"
      specs: "#{options.ref}specs"
      app: "#{options.ref}app"
      absolute : "absolute/?m="

    @bootstrap = ["knockout.validation","knockout.viewmodel"]
    @mock = ->
      define 'pathPlugins', ->
        return
      define 'pathConfig', ->
        return
      define 'text!index.html', ->
        return ''

      return
    return



  return setup