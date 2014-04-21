define(['lib/js2coffee/js2coffeeEditor'],function (js2coffeeEditor) {
    var editor = new js2coffeeEditor();
    ko.bindingHandlers.js2coffeeEditor = {
        init: function (element,valueAccessor) {
            var model = valueAccessor();
            model.subscribe(function(){
                editor.update(model());
            });
            editor.init(model());
        }
    };
});

