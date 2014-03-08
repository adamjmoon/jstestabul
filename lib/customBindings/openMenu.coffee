define ->
  ko.bindingHandlers.openMenu =
    init: (element) ->
      el = $(element)
      return unless el.hammer?
      el.hammer().on "swiperight", (event) ->
        event.gesture.preventDefault()
        event.gesture.stopPropagation()
        event.gesture.stopDetect()
        document.location.hash = "#main-nav"
        return
      return
  return