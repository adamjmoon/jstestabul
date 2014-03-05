define ->
  ko.bindingHandlers.localScroll =
    init: (element, valueAccessor) ->
      el = $(element)
      options = valueAccessor()
      el.localScroll({target: options.target, lazy: true, hash: false });
      return

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

  ko.bindingHandlers.debugSwipe =
    init: (element) ->
     el = $(element)
     return unless el.hammer? and ot.config?.isDev
     el.hammer().on "hold swiperight", (event) ->
       alert(el.context.id + " swiped right ")
       return

     el.hammer().on "swipeleft", (event) ->
       alert(el.id + " swiped left ")
       return

  ko.bindingHandlers.debugTap =
    init: (element) ->
     el = $(element)
     return unless el.hammer? and ot.config?.isDev
     el.hammer().on "tap", (event) ->
       alert(el.context.id + " tapped ")
       return

     el.hammer().on "tap", (event) ->
       alert(el.context.id + " tapped ")
       return



  ko.bindingHandlers.sideMenuClose =
    init: (element, valueAccessor) ->
      el = $(element)
      return unless el.hammer?
      el.hammer().on "swipeleft dragleft", (event) ->
        event.gesture.preventDefault()
        event.gesture.stopPropagation()
        event.gesture.stopDetect()
        options = valueAccessor()
        $('a.open-close').click();
        return
      return

  ko.bindingHandlers.tap =
    init: (element, valueAccessor) ->
      # Setup phantom click collector
      tapHelper = $("#tapHelper")
      unless $("#tapHelper").length > 0
        $("body").append("<div id='tapHelper' style='display: none; position: absolute; width: 3px; height: 3px; z-index: 5000;'></div>")
        tapHelper = $("#tapHelper")
        tapHelper.on "click", (event) ->
          # Caught the phantom click, prevent default
          event.preventDefault()
          tapHelper.hide()
          return

      tapBinding = new TapBinding(element, valueAccessor, tapHelper)

  return