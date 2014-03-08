define ->
  ko.bindingHandlers.swipeRight =
    init: (element, valueAccessor) ->
     el = $(element)
     action = valueAccessor()
     return unless el.hammer?
     el.hammer().on "swipeRight", (event) ->
       action()
       return

  return