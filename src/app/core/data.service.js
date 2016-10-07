(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', 'toastr'];

    function dataservice($http, toastr) {
        var service = {
            get: get,
            destroy: destroy,
            save: save,
            update: update,
            post: save,
            weatherApi: {
                byCoord:getWeatherByCoord,
            },
            geocoderApi:{
                find:findLocationByAddress
            },
            helper: {
                deleteNullProperties: delete_null_properties,
            }
        }
        var owmUrl = "http://api.openweathermap.org/data/2.5/weather?APPID=335d350aea231548c1701c398c22011b&units=metric&";
        var geocoderApiKey = "AIzaSyBzjrcbFKme3zUQKuF75Vb3woLiubSrhnI";
        var weatherUrls = {
            byCityName : owmUrl+"q=",//the city name follows
            byCityId: owmUrl+"id=",//city id follows
            byCoord: owmUrl//+lat=35&lon=139 follows
        }
        var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&key="+geocoderApiKey+"&address="//query


        var errorMessage = "Problem fetching data";
        var unAuthorizedErrorMessage = "You are not authorized";
        return service;
        /*
         Service functions
         */
        function get(url) {
            return $http.get(url);
        };

        function destroy(url, id) {
            return $http.delete(url + id);
        };

        function save(data, url) {
            return $http({
                method: 'POST',
                url: url,
                headers: {'Content-Type': 'application/json'},
                data: angular.toJson(data),
            });
        };

        function update(data, url) {
            return $http({
                method: 'PUT',
                url: url + data.id,// tag/1
                headers: {'Content-Type': 'application/json'},
                data: angular.toJson(data),
            });
        }

        /*
         API 1 functions
         */

        function getWeatherByCoord(coord){
            var postfix = "lat="+coord.lat+"&lon="+coord.lng;
            return get(weatherUrls.byCoord+postfix)
        }

        function findLocationByAddress(address) {
            return get(geocodeUrl+address);
        }
        /*
         Herplers
         */
        function delete_null_properties(test, recurse) {
            for (var i in test) {
                if (test[i] === null || test[i] === undefined) {
                    delete test[i];
                } else if (recurse && typeof test[i] === 'object') {
                    delete_null_properties(test[i], recurse);
                }
            }
            return test;
        }
    }
})();