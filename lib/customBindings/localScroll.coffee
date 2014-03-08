define ->
  ko.bindingHandlers.localScroll =
    init: (element, valueAccessor) ->
      el = $(element)
      options = valueAccessor()
      el.localScroll({target: options.target, lazy: true, hash: false });
      return
  return