define ->
  ko.bindingHandlers.jscolor =
    init: (element) ->
      require ['lib/jscolor'], ->
        jscolor.init()
        return
      return
  return