define ->

  setup = (options) ->
    @paths =
      'knockout.validation': "#{options.ref}lib/knockout.validation"
      'knockout.viewmodel': "#{options.ref}lib/knockout.viewmodel"
      clientEnrollModel: "absolute/common/models/clientEnrollModel"
      transitions: "#{options.ref}lib/durandal/transitions"
      lib: "#{options.ref}lib"
      specs: "#{options.ref}specs"
      app: "#{options.ref}app"
      "common": "/absolute/common"
      "clientEnrollModel": "/absolute/common/models/us/client"
      "enrollModel": "/absolute/common/models/us/enroll"

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