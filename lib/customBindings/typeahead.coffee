define [ 'lib/typeahead.bundle.min' ] , ->
  ko.bindingHandlers.typeahead =
    init : ( element , valueAccessor , allBindings , viewModel , bindingContext ) ->
      debugger
      el = $( element )
      options = valueAccessor()
      # constructs the suggestion engine


#        ItchCork.on( 'end' , ->
#
#          typeAhead = new Bloodhound(
#          datumTokenizer : Bloodhound.tokenizers.obj.whitespace( "value" )
#          queryTokenizer : Bloodhound.tokenizers.whitespace
#           # `items` is an array defined in "The Basics"
#          local : $.map( options.source , ( item ) ->
#            value : item[ options.property ]
#          )
#
#          # kicks off the loading/processing of `local` and `prefetch`
#          typeAhead.initialize()
#          $( "##{el.Id} .typeahead" ).typeahead
#            hint : true
#            highlight : true
#            minLength : 1
#          ,
#            name : if options.name then options.name else ""
#            displayKey : "value"
#
#          # `ttAdapter` wraps the suggestion engine in an adapter that
#          # is compatible with the typeahead jQuery plugin
#            source : typeAhead.ttAdapter()
#        )

#      )

  return