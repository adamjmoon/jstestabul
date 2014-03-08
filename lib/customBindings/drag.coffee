define ->
  ko.bindingHandlers.drag =
    init: (element, valueAccessor) ->
     el = $(element)
     action = valueAccessor()
     return unless el.hammer?
     el.hammer().on "drag", (event) ->
       action()
       return

  return