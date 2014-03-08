define ->
  ko.bindingHandlers.swipeLeft =
    init: (element, valueAccessor) ->
     el = $(element)
     action = valueAccessor()
     return unless el.hammer?
     el.hammer().on "swipeLeft", (event) ->
       action()
       return

  return