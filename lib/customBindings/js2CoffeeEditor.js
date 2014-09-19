define(["lib/js2coffee/js2coffeeEditor"],function (Js2coffeeEditor) {
    window.editor = new Js2coffeeEditor();

    ko.bindingHandlers.js2coffeeEditor = {
        update: function (element,valueAccessor) {
            var model = valueAccessor();
            model.subscribe(function(){
                editor.update(model());
            });
            editor.init(model());
        }
    };
});

