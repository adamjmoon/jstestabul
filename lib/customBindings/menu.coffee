define ->

  openMenu = ->
    menu = document.getElementById('main-nav')
    menuOpen = document.getElementById('open-menu')
    menuClose = document.getElementById('close-menu')
    menu.style.width='320px'
    menuClose.style.display='block'
    menuOpen.style.display='none'
    return

  closeMenu = ->
    menu = document.getElementById('main-nav')
    menuOpen = document.getElementById('open-menu')
    menuClose = document.getElementById('close-menu')
    menu.style.width='0px'
    menuClose.style.display='none'
    menuOpen.style.display='block'
    return

  ko.bindingHandlers.closeMenuOnSwipe =
    init: (element) ->
      el = $(element)
      return unless el.hammer?
      el.hammer().on "swipeleft dragleft", (event) ->
        event.gesture.preventDefault()
        event.gesture.stopPropagation()
        event.gesture.stopDetect()
        closeMenu()
        return
      return

  ko.bindingHandlers.closeMenuOnTap =
      init: (element) ->
        el = $(element)
        return unless el.hammer?
        el.hammer().on "tap", (event) ->
          event.gesture.preventDefault()
          event.gesture.stopPropagation()
          event.gesture.stopDetect()

          closeMenu()
          return
        return

  ko.bindingHandlers.openMenuOnSwipe =
    init: (element) ->
      el = $(element)
      return unless el.hammer?
      el.hammer().on "swiperight", (event) ->
        event.gesture.preventDefault()
        event.gesture.stopPropagation()
        event.gesture.stopDetect()
        openMenu()
        return
      return

  ko.bindingHandlers.openMenuOnTap =
    init: (element) ->
      el = $(element)
      return unless el.hammer?
#      el.click(->
#        openMenu()
#        return
#      )
      el.hammer().on "tap", (event) ->
        event.gesture.preventDefault()
        event.gesture.stopPropagation()
        event.gesture.stopDetect()
        openMenu()
        return
      return
  return