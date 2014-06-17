define (require) ->
  system = require "durandal/system"

  fadingCss = (duration) ->
    return {
      "-webkit-transition": "opacity #{duration}ms"
      "-moz-transition": "opacity #{duration}ms"
      "-o-transition": "opacity #{duration}ms"
      "transition": "opacity #{duration}ms"
    }

  clearCss =
    "-webkit-transition": ""
    "-moz-transition": ""
    "-o-transition": ""
    "transition": ""
    "display": ""
    "opacity": ""

  fadeOut = ($el, cb) ->
    $el.css fadingCss(100)
    $el.css "opacity", 0
    setTimeout (->
      $el.hide()
      cb()
    ), 100
    return

  fadeIn = ($el, cb) ->
    $el.css "opacity", 0
    $el.css "display", "block"
    $el.show()
    $el.css fadingCss(500)
    setTimeout (->
      $el.css "opacity", 1
      setTimeout (->
        $el.css clearCss
        cb()
      ), 500
    ), 0

  slightFade = (context) ->
    return system.defer((dfd) ->
      endTransition = ->
        dfd.resolve()

      unless context.child
        fadeOut $(context.activeView), endTransition
      else
        startTransition = ->
          $(document).scrollTop(0) unless context.keepScrollPosition
          context.triggerAttach()
          fadeIn $(context.child), endTransition

        if context.activeView
          fadeOut $(context.activeView), startTransition
        else
          startTransition()
    ).promise()

  return slightFade
