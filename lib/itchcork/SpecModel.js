define(function () {
    var SpecModel = function(specModule) {

         this.coffeeSourceStr =  new ko.observable('');
         this.jsSourceStr =  new ko.observable('');
         this.es6SourceStr = new ko.observable('');
         this.es5SourceStr = new ko.observable('');

         this.processed = new ko.observable(false);
         this.moduleName = new ko.observable(specModule && specModule.length > 0 ? specModule : 'specs/{new}_spec');

    };

    return SpecModel;
});