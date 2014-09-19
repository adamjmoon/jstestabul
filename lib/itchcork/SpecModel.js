define(function () {
    var SpecModel = function(specModule) {

         this.coffeeSourceStr =  new ko.observable('');
         this.jsSourceStr =  new ko.observable('');
         this.processed = new ko.observable(false);
         this.moduleName = new ko.observable(specModule);
    };

    return SpecModel;
});