define ->
  ko.bindingHandlers.hold =
    init: (element, valueAccessor) ->
     el = $(element)
     action = valueAccessor()
     return unless el.hammer?
     el.hammer().on "hold", (event) ->
       action()
       return

  return