define ->
  ko.bindingHandlers.closeMenu =
    init: (element) ->
      el = $(element)
      return unless el.hammer?
      el.hammer().on "swipeleft dragleft", (event) ->
        event.gesture.preventDefault()
        event.gesture.stopPropagation()
        event.gesture.stopDetect()

        document.location.hash = "#"
        return
      return
  return