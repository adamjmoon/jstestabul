define(['lib/js2coffee/js2coffeeEditor'],function (js2coffeeEditor) {
    var editor = new js2coffeeEditor();
    ko.bindingHandlers.js2coffeeEditor = {
        update: function (element,valueAccessor) {
            var model = valueAccessor();
            model.subscribe(function(){
                editor.update(model());
            });
            console.log(model());
            editor.init(model());
        }
    };
});

