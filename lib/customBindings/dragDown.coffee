define ->
  ko.bindingHandlers.dragDown =
    init: (element, valueAccessor) ->
     el = $(element)
     action = valueAccessor()
     return unless el.hammer?
     el.hammer().on "dragdown", (event) ->
       action()
       return

  return