(function () {
    'use strict';

    angular.module('app.weather').component('weatherViewer', {
        templateUrl: 'build/html/weather/index.html',
        controller: WeatherViewController,
        bindings: {
            loadedSupplier: "=",
            tags: "=loadedTags",
        }
    });
    WeatherViewController.$inject = ['dataservice', 'toastr', '$timeout'];
    function WeatherViewController(dataservice, toastr, $timeout ) {

        var ctrl = this;
        this.domIds = {
        }
        this.init = init;

        this.init();

        function init() {

        }
    };
})();
