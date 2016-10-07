(function () {
    'use strict';

    angular.module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .config(configToastr)
        .config(configMoment);

    configToastr.$inject = ['toastr'];
    function configToastr(toastr) {
        // toastr.options.rtl = true;
        toastr.options.positionClass = "toast-top-right";
    }
    configMoment.$inject = ['moment'];
    function configMoment(moment){
        // moment.loadPersian();
    }
})();