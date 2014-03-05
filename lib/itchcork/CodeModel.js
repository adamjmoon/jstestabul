define(function () {
    function CodeModel() {
        return {
            properties: new ko.observableArray([]),
            coffeeSourceStr: new ko.observable(''),
            jsSourceStr: new ko.observable(''),
            jsContext: undefined,
            jsFunctionOrObject: undefined,
            processed: new ko.observable(false)
        };
    }

    return CodeModel;
});