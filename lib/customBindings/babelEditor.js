define(["lib/babel/babelEditor"], function (BabelEditor) {
    window.editor = new BabelEditor();

    ko.bindingHandlers.babelEditor = {
        update: function (element, valueAccessor) {
            var model = valueAccessor();
            model.subscribe(function (model) {
                editor.update(model);
            });
            editor.init(model());
        }
    };
});

