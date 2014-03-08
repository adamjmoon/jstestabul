define ->
  ko.bindingHandlers.dragRight =
    init: (element, valueAccessor) ->
     el = $(element)
     action = valueAccessor()
     return unless el.hammer?
     el.hammer().on "dragright", (event) ->
       action()
       return

  return