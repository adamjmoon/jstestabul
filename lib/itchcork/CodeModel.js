define(function () {
    var CodeModel = function(codeModule) {

         this.properties = new ko.observableArray([]);
         this.coffeeSourceStr =  new ko.observable('');
         this.jsSourceStr =  new ko.observable('');
         this.es6SourceStr = new ko.observable('');
         this.es5SourceStr = new ko.observable('');
         this.jsContext =  new ko.observable();
         this.jsFunctionOrObject =  new ko.observable();
         this.processed = new ko.observable(false);
         this.moduleName = new ko.observable(codeModule && codeModule.length > 0 ? codeModule : '{new}');
    };

    return CodeModel;
});