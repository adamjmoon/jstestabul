define [ 'lib/typeahead.bundle.min' ] , ->
  ko.bindingHandlers.typeahead =
    init : ( element , valueAccessor , allBindings , viewModel , bindingContext ) ->

      options = valueAccessor()
      # constructs the suggestion engine
      setupTypeAhead(options.list, element.id)
      return

  setupTypeAhead = (list, id) ->
    bloodHoundOptions = undefined
    modules = undefined
    bloodHoundOptions =
      datumTokenizer: (d) ->
        Bloodhound.tokenizers.whitespace d.tokens.join("/ ")

      queryTokenizer: Bloodhound.tokenizers.whitespace
      limit: 10
      local: $.map(list, (moduleName) ->
        tokens = moduleName.split("/")
        tokens.push moduleName
        value: moduleName
        tokens: tokens
      )

    modules = new Bloodhound(bloodHoundOptions)
    modules.initialize()
    $("#" + id + " .typeahead").typeahead(
      hint: true
      highlight: true
      minLength: 1
    ,
      name: "modules"

      source: modules.ttAdapter()
    ).on "typeahead:selected", ($e, datum) ->
      suiteLink = undefined
      suiteLinkId = undefined
      suiteLinkId = "" + datum["value"]
      suiteLink = document.getElementById(suiteLinkId)
      suiteLink.children[0].click()  if suiteLink.children
      return

    return

  return