define(function () {
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

