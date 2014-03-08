define ->
  ko.bindingHandlers.dragEnd =
    init: (element, valueAccessor) ->
     el = $(element)
     action = valueAccessor()
     return unless el.hammer?
     el.hammer().on "dragEnd", (event) ->
       action()
       return

  return