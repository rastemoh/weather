(function () {
    'use strict';

    angular.module('app.weather').component('weatherViewer', {
        templateUrl: 'build/html/weather/weather.html',
        controller: WeatherViewController,
        bindings: {
            loadedSupplier: "=",
            tags: "=loadedTags",
        }
    });
    WeatherViewController.$inject = ['dataservice', 'toastr', '$timeout' , 'geolocation'];
    function WeatherViewController(dataservice, toastr, $timeout  , geolocation) {

        var ctrl = this;
        this.domIds = {
        }
        this.init = init;
        this.loadWeatherByCoord = loadWeatherByCoord;
        this.lookupLocation = lookupLocation;
        this.init();

        function init() {
            ctrl.geoLocation = false
            geolocation.getLocation().then(function(data){
                ctrl.geoLocation = true;
                ctrl.coords = {lat:data.coords.latitude, lng:data.coords.longitude};
                ctrl.loadWeatherByCoord(ctrl.coords);
            },function(response){
                toastr.error(response);
                
            });
        }

        function loadWeatherByCoord(coord) {
            dataservice.weatherApi.byCoord(coord)
                .then(function (response) {
                    ctrl.weatherData = response.data;
                    ctrl.imageUrl = "http://openweathermap.org/img/w/"+ctrl.weatherData.weather[0].icon+".png"
                },function (response) {
                    toastr.error("Problem loading weather data");
                })

        }

        function lookupLocation(value) {
            return dataservice.geocoderApi.find(value)
                .then(function (response) {
                    // console.log(response);
                    return response.data.results.map(function(item){
                        return {
                            name:item.formatted_address,
                            coord:item.geometry.location,
                        };
                    });
                },function (response) {
                    toastr.error("Problem loading locations")
                })
        }
    };
})();
