define(["lib/babel/babelEditor"],function (BabelEditor) {
    window.editor = new BabelEditor();

    ko.bindingHandlers.babelEditor = {
        update: function (element,valueAccessor) {
            var model = valueAccessor();
                model.subscribe(function(){
                editor.update(model());
            });
            editor.init(model());
        }
    };
});

