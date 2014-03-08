define ->
  ko.bindingHandlers.dragLeft =
    init: (element, valueAccessor) ->
     el = $(element)
     action = valueAccessor()
     return unless el.hammer?
     el.hammer().on "dragleft", (event) ->
       action()
       return

  return