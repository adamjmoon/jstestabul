define (require) ->
    system = require "durandal/system"
    composition = require "durandal/composition"

    fadeOutDuration = 100
    endValues = {
        opacity: 1
    }
    clearValues = {
        opacity: ''
        display: ''
    }

    slightFade = (context) ->
        return system.defer((dfd) ->
            endTransition = ->
                dfd.resolve()
            
            scrollIfNeeded = ->
                $(document).scrollTop(0) unless context.keepScrollPosition

            unless context.child
                $(context.activeView).fadeOut(fadeOutDuration, endTransition)
            else
                duration = context.duration || 500

                startTransition = ->
                    scrollIfNeeded()
                    context.triggerAttach()

                    startValues = {
                        opacity: 0
                        display: 'block'
                    }

                    $child = $(context.child)

                    $child.css(startValues)
                    $child.animate(endValues, {
                        duration: duration
                        easing: 'swing'
                        always: ->
                            $child.css(clearValues)
                            endTransition()
                    })

                if context.activeView
                    $(context.activeView).fadeOut({ duration: fadeOutDuration, always: startTransition })
                else
                    startTransition()
        ).promise()

    return slightFade
