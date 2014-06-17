define(function () {
    var CodeModel = function() {

         this.properties = new ko.observableArray([]);
         this.coffeeSourceStr =  new ko.observable('');
         this.jsSourceStr =  new ko.observable('');
         this.jsContext =  new ko.observable();
         this.jsFunctionOrObject =  new ko.observable();
         this.processed = new ko.observable(false);
         this.moduleName = new ko.observable('');
    };

    return CodeModel;
});