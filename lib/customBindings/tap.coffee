define ->
  ko.bindingHandlers.tap =
    init: (element, valueAccessor) ->
     el = $(element)
     action = valueAccessor()
     return unless el.hammer?
     el.hammer().on "tap", (event) ->
       action()
       return

  return