define(['lib/amplify'],function () {
    return function UnitTestFrameworkManager() {

        UnitTestFrameworkManager.prototype.init = function () {
            if (!amplify.store('currentUnitTestFramework')) {
                this.set('itchcork');
            }
            return this.getFramework();
        }
        UnitTestFrameworkManager.prototype.set = function (framework) {
            if (framework != amplify.store('currentUnitTestFramework')) {
                amplify.store('currentUnitTestFramework', framework);
            }
        };
        UnitTestFrameworkManager.prototype.getFramework = function () {
            return amplify.store('currentUnitTestFramework');
        };
    };
});
