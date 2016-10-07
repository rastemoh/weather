(function () {
    'use strict';

    angular.module('app',
        [
            'app.core',
            'app.weather'
            // 'app.widget',
            // 'ui.bootstrap',
        ]);

})();

(function() {
  'use strict';

  angular
    .module('app.core', [
      // 'ui.router',
    ]);
})();

(function() {
    'use strict';

    angular.module('app.weather', [
        'app.core',
        'geolocation',
        'ui.bootstrap'
        // 'app.widget',
    ]);

})();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb3JlLm1vZHVsZS5qcyIsIndlYXRoZXIubW9kdWxlLmpzIiwiY29yZS9jb25maWcuanMiLCJjb3JlL2RhdGEuc2VydmljZS5qcyIsIndlYXRoZXIvd2VhdGhlci5jb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcsXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAnYXBwLmNvcmUnLFxyXG4gICAgICAgICAgICAnYXBwLndlYXRoZXInXHJcbiAgICAgICAgICAgIC8vICdhcHAud2lkZ2V0JyxcclxuICAgICAgICAgICAgLy8gJ3VpLmJvb3RzdHJhcCcsXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyXHJcbiAgICAubW9kdWxlKCdhcHAuY29yZScsIFtcclxuICAgICAgLy8gJ3VpLnJvdXRlcicsXHJcbiAgICBdKTtcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAud2VhdGhlcicsIFtcclxuICAgICAgICAnYXBwLmNvcmUnLFxyXG4gICAgICAgICdnZW9sb2NhdGlvbicsXHJcbiAgICAgICAgJ3VpLmJvb3RzdHJhcCdcclxuICAgICAgICAvLyAnYXBwLndpZGdldCcsXHJcbiAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvcmUnKVxyXG4gICAgICAgIC5jb25zdGFudCgndG9hc3RyJywgdG9hc3RyKVxyXG4gICAgICAgIC5jb25zdGFudCgnbW9tZW50JywgbW9tZW50KVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnVG9hc3RyKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnTW9tZW50KTtcclxuXHJcbiAgICBjb25maWdUb2FzdHIuJGluamVjdCA9IFsndG9hc3RyJ107XHJcbiAgICBmdW5jdGlvbiBjb25maWdUb2FzdHIodG9hc3RyKSB7XHJcbiAgICAgICAgLy8gdG9hc3RyLm9wdGlvbnMucnRsID0gdHJ1ZTtcclxuICAgICAgICB0b2FzdHIub3B0aW9ucy5wb3NpdGlvbkNsYXNzID0gXCJ0b2FzdC10b3AtcmlnaHRcIjtcclxuICAgIH1cclxuICAgIGNvbmZpZ01vbWVudC4kaW5qZWN0ID0gWydtb21lbnQnXTtcclxuICAgIGZ1bmN0aW9uIGNvbmZpZ01vbWVudChtb21lbnQpe1xyXG4gICAgICAgIC8vIG1vbWVudC5sb2FkUGVyc2lhbigpO1xyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5jb3JlJylcclxuICAgICAgICAuZmFjdG9yeSgnZGF0YXNlcnZpY2UnLCBkYXRhc2VydmljZSk7XHJcblxyXG4gICAgZGF0YXNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAndG9hc3RyJ107XHJcblxyXG4gICAgZnVuY3Rpb24gZGF0YXNlcnZpY2UoJGh0dHAsIHRvYXN0cikge1xyXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBnZXQ6IGdldCxcclxuICAgICAgICAgICAgZGVzdHJveTogZGVzdHJveSxcclxuICAgICAgICAgICAgc2F2ZTogc2F2ZSxcclxuICAgICAgICAgICAgdXBkYXRlOiB1cGRhdGUsXHJcbiAgICAgICAgICAgIHBvc3Q6IHNhdmUsXHJcbiAgICAgICAgICAgIHdlYXRoZXJBcGk6IHtcclxuICAgICAgICAgICAgICAgIGJ5Q29vcmQ6Z2V0V2VhdGhlckJ5Q29vcmQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdlb2NvZGVyQXBpOntcclxuICAgICAgICAgICAgICAgIGZpbmQ6ZmluZExvY2F0aW9uQnlBZGRyZXNzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlbHBlcjoge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlTnVsbFByb3BlcnRpZXM6IGRlbGV0ZV9udWxsX3Byb3BlcnRpZXMsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG93bVVybCA9IFwiaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9BUFBJRD0zMzVkMzUwYWVhMjMxNTQ4YzE3MDFjMzk4YzIyMDExYiZ1bml0cz1tZXRyaWMmXCI7XHJcbiAgICAgICAgdmFyIGdlb2NvZGVyQXBpS2V5ID0gXCJBSXphU3lCempyY2JGS21lM3pVUUt1Rjc1VmIzd29MaXViU3JobklcIjtcclxuICAgICAgICB2YXIgd2VhdGhlclVybHMgPSB7XHJcbiAgICAgICAgICAgIGJ5Q2l0eU5hbWUgOiBvd21VcmwrXCJxPVwiLC8vdGhlIGNpdHkgbmFtZSBmb2xsb3dzXHJcbiAgICAgICAgICAgIGJ5Q2l0eUlkOiBvd21VcmwrXCJpZD1cIiwvL2NpdHkgaWQgZm9sbG93c1xyXG4gICAgICAgICAgICBieUNvb3JkOiBvd21VcmwvLytsYXQ9MzUmbG9uPTEzOSBmb2xsb3dzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBnZW9jb2RlVXJsID0gXCJodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uP3NlbnNvcj1mYWxzZSZrZXk9XCIrZ2VvY29kZXJBcGlLZXkrXCImYWRkcmVzcz1cIi8vcXVlcnlcclxuXHJcblxyXG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcIlByb2JsZW0gZmV0Y2hpbmcgZGF0YVwiO1xyXG4gICAgICAgIHZhciB1bkF1dGhvcml6ZWRFcnJvck1lc3NhZ2UgPSBcIllvdSBhcmUgbm90IGF1dGhvcml6ZWRcIjtcclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuICAgICAgICAvKlxyXG4gICAgICAgICBTZXJ2aWNlIGZ1bmN0aW9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldCh1cmwpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmwpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRlc3Ryb3kodXJsLCBpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZGVsZXRlKHVybCArIGlkKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzYXZlKGRhdGEsIHVybCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGFuZ3VsYXIudG9Kc29uKGRhdGEpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGUoZGF0YSwgdXJsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwgKyBkYXRhLmlkLC8vIHRhZy8xXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBhbmd1bGFyLnRvSnNvbihkYXRhKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICBBUEkgMSBmdW5jdGlvbnNcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0V2VhdGhlckJ5Q29vcmQoY29vcmQpe1xyXG4gICAgICAgICAgICB2YXIgcG9zdGZpeCA9IFwibGF0PVwiK2Nvb3JkLmxhdCtcIiZsb249XCIrY29vcmQubG5nO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0KHdlYXRoZXJVcmxzLmJ5Q29vcmQrcG9zdGZpeClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRMb2NhdGlvbkJ5QWRkcmVzcyhhZGRyZXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXQoZ2VvY29kZVVybCthZGRyZXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICAgSGVycGxlcnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBkZWxldGVfbnVsbF9wcm9wZXJ0aWVzKHRlc3QsIHJlY3Vyc2UpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVzdFtpXSA9PT0gbnVsbCB8fCB0ZXN0W2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGVzdFtpXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVjdXJzZSAmJiB0eXBlb2YgdGVzdFtpXSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGVfbnVsbF9wcm9wZXJ0aWVzKHRlc3RbaV0sIHJlY3Vyc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAud2VhdGhlcicpLmNvbXBvbmVudCgnd2VhdGhlclZpZXdlcicsIHtcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2J1aWxkL2h0bWwvd2VhdGhlci93ZWF0aGVyLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IFdlYXRoZXJWaWV3Q29udHJvbGxlcixcclxuICAgICAgICBiaW5kaW5nczoge1xyXG4gICAgICAgICAgICBsb2FkZWRTdXBwbGllcjogXCI9XCIsXHJcbiAgICAgICAgICAgIHRhZ3M6IFwiPWxvYWRlZFRhZ3NcIixcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFdlYXRoZXJWaWV3Q29udHJvbGxlci4kaW5qZWN0ID0gWydkYXRhc2VydmljZScsICd0b2FzdHInLCAnJHRpbWVvdXQnICwgJ2dlb2xvY2F0aW9uJ107XHJcbiAgICBmdW5jdGlvbiBXZWF0aGVyVmlld0NvbnRyb2xsZXIoZGF0YXNlcnZpY2UsIHRvYXN0ciwgJHRpbWVvdXQgICwgZ2VvbG9jYXRpb24pIHtcclxuXHJcbiAgICAgICAgdmFyIGN0cmwgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZG9tSWRzID0ge1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXQgPSBpbml0O1xyXG4gICAgICAgIHRoaXMubG9hZFdlYXRoZXJCeUNvb3JkID0gbG9hZFdlYXRoZXJCeUNvb3JkO1xyXG4gICAgICAgIHRoaXMubG9va3VwTG9jYXRpb24gPSBsb29rdXBMb2NhdGlvbjtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgY3RybC5nZW9Mb2NhdGlvbiA9IGZhbHNlXHJcbiAgICAgICAgICAgIGdlb2xvY2F0aW9uLmdldExvY2F0aW9uKCkudGhlbihmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgICAgIGN0cmwuZ2VvTG9jYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY3RybC5jb29yZHMgPSB7bGF0OmRhdGEuY29vcmRzLmxhdGl0dWRlLCBsbmc6ZGF0YS5jb29yZHMubG9uZ2l0dWRlfTtcclxuICAgICAgICAgICAgICAgIGN0cmwubG9hZFdlYXRoZXJCeUNvb3JkKGN0cmwuY29vcmRzKTtcclxuICAgICAgICAgICAgfSxmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuZXJyb3IocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZFdlYXRoZXJCeUNvb3JkKGNvb3JkKSB7XHJcbiAgICAgICAgICAgIGRhdGFzZXJ2aWNlLndlYXRoZXJBcGkuYnlDb29yZChjb29yZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwud2VhdGhlckRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuaW1hZ2VVcmwgPSBcImh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3cvXCIrY3RybC53ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmljb24rXCIucG5nXCJcclxuICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKFwiUHJvYmxlbSBsb2FkaW5nIHdlYXRoZXIgZGF0YVwiKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9va3VwTG9jYXRpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFzZXJ2aWNlLmdlb2NvZGVyQXBpLmZpbmQodmFsdWUpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEucmVzdWx0cy5tYXAoZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOml0ZW0uZm9ybWF0dGVkX2FkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZDppdGVtLmdlb21ldHJ5LmxvY2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdHIuZXJyb3IoXCJQcm9ibGVtIGxvYWRpbmcgbG9jYXRpb25zXCIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
