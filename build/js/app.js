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
        toastr.options.positionClass = "toast-top-left";
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
            api: {
                getAll: getAll,
                delete: remove,
                create: create,//it is not like store, and it's rarely used.
                store: store,
                getOne: getOne,
                update: apiUpdate,
                methods: methodCall,
            },
            helper: {
                deleteNullProperties: delete_null_properties,
            }
        }
        var urls = {}
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
        function getAll(type) {
            return get(urls[type].index);
        }

        function remove(type, id) {
            return destroy(urls[type].delete, id);
        }

        function create(type) {
            return get(urls[type].create);
        }

        function store(type, data) {
            return save(data, urls[type].store);
        }

        function getOne(type, id) {
            return get(urls[type].index + "/" + id);
        }

        function apiUpdate(type, data) {
            data = delete_null_properties(data);
            return update(data, urls[type].update);
        }

        function methodCall(type, data) {
            return save(data, urls[type].methods);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb3JlLm1vZHVsZS5qcyIsIndlYXRoZXIubW9kdWxlLmpzIiwiY29yZS9jb25maWcuanMiLCJjb3JlL2RhdGEuc2VydmljZS5qcyIsIndlYXRoZXIvd2VhdGhlci5jb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ2FwcC5jb3JlJyxcclxuICAgICAgICAgICAgJ2FwcC53ZWF0aGVyJ1xyXG4gICAgICAgICAgICAvLyAnYXBwLndpZGdldCcsXHJcbiAgICAgICAgICAgIC8vICd1aS5ib290c3RyYXAnLFxyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhclxyXG4gICAgLm1vZHVsZSgnYXBwLmNvcmUnLCBbXHJcbiAgICAgIC8vICd1aS5yb3V0ZXInLFxyXG4gICAgXSk7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLndlYXRoZXInLCBbXHJcbiAgICAgICAgJ2FwcC5jb3JlJyxcclxuICAgICAgICAvLyAnYXBwLndpZGdldCcsXHJcbiAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvcmUnKVxyXG4gICAgICAgIC5jb25zdGFudCgndG9hc3RyJywgdG9hc3RyKVxyXG4gICAgICAgIC5jb25zdGFudCgnbW9tZW50JywgbW9tZW50KVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnVG9hc3RyKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnTW9tZW50KTtcclxuXHJcbiAgICBjb25maWdUb2FzdHIuJGluamVjdCA9IFsndG9hc3RyJ107XHJcbiAgICBmdW5jdGlvbiBjb25maWdUb2FzdHIodG9hc3RyKSB7XHJcbiAgICAgICAgLy8gdG9hc3RyLm9wdGlvbnMucnRsID0gdHJ1ZTtcclxuICAgICAgICB0b2FzdHIub3B0aW9ucy5wb3NpdGlvbkNsYXNzID0gXCJ0b2FzdC10b3AtbGVmdFwiO1xyXG4gICAgfVxyXG4gICAgY29uZmlnTW9tZW50LiRpbmplY3QgPSBbJ21vbWVudCddO1xyXG4gICAgZnVuY3Rpb24gY29uZmlnTW9tZW50KG1vbWVudCl7XHJcbiAgICAgICAgLy8gbW9tZW50LmxvYWRQZXJzaWFuKCk7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvcmUnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdkYXRhc2VydmljZScsIGRhdGFzZXJ2aWNlKTtcclxuXHJcbiAgICBkYXRhc2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCcsICd0b2FzdHInXTtcclxuXHJcbiAgICBmdW5jdGlvbiBkYXRhc2VydmljZSgkaHR0cCwgdG9hc3RyKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIGdldDogZ2V0LFxyXG4gICAgICAgICAgICBkZXN0cm95OiBkZXN0cm95LFxyXG4gICAgICAgICAgICBzYXZlOiBzYXZlLFxyXG4gICAgICAgICAgICB1cGRhdGU6IHVwZGF0ZSxcclxuICAgICAgICAgICAgcG9zdDogc2F2ZSxcclxuICAgICAgICAgICAgYXBpOiB7XHJcbiAgICAgICAgICAgICAgICBnZXRBbGw6IGdldEFsbCxcclxuICAgICAgICAgICAgICAgIGRlbGV0ZTogcmVtb3ZlLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlOiBjcmVhdGUsLy9pdCBpcyBub3QgbGlrZSBzdG9yZSwgYW5kIGl0J3MgcmFyZWx5IHVzZWQuXHJcbiAgICAgICAgICAgICAgICBzdG9yZTogc3RvcmUsXHJcbiAgICAgICAgICAgICAgICBnZXRPbmU6IGdldE9uZSxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZTogYXBpVXBkYXRlLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kczogbWV0aG9kQ2FsbCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVscGVyOiB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVOdWxsUHJvcGVydGllczogZGVsZXRlX251bGxfcHJvcGVydGllcyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdXJscyA9IHt9XHJcbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IFwiUHJvYmxlbSBmZXRjaGluZyBkYXRhXCI7XHJcbiAgICAgICAgdmFyIHVuQXV0aG9yaXplZEVycm9yTWVzc2FnZSA9IFwiWW91IGFyZSBub3QgYXV0aG9yaXplZFwiO1xyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIFNlcnZpY2UgZnVuY3Rpb25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0KHVybCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHVybCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZGVzdHJveSh1cmwsIGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5kZWxldGUodXJsICsgaWQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNhdmUoZGF0YSwgdXJsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogYW5ndWxhci50b0pzb24oZGF0YSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZShkYXRhLCB1cmwpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6IHVybCArIGRhdGEuaWQsLy8gdGFnLzFcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGFuZ3VsYXIudG9Kc29uKGRhdGEpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIEFQSSAxIGZ1bmN0aW9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEFsbCh0eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXQodXJsc1t0eXBlXS5pbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZW1vdmUodHlwZSwgaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRlc3Ryb3kodXJsc1t0eXBlXS5kZWxldGUsIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZSh0eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXQodXJsc1t0eXBlXS5jcmVhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3RvcmUodHlwZSwgZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2F2ZShkYXRhLCB1cmxzW3R5cGVdLnN0b3JlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldE9uZSh0eXBlLCBpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0KHVybHNbdHlwZV0uaW5kZXggKyBcIi9cIiArIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFwaVVwZGF0ZSh0eXBlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkZWxldGVfbnVsbF9wcm9wZXJ0aWVzKGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlKGRhdGEsIHVybHNbdHlwZV0udXBkYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1ldGhvZENhbGwodHlwZSwgZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2F2ZShkYXRhLCB1cmxzW3R5cGVdLm1ldGhvZHMpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIEhlcnBsZXJzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlX251bGxfcHJvcGVydGllcyh0ZXN0LCByZWN1cnNlKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGVzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlc3RbaV0gPT09IG51bGwgfHwgdGVzdFtpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRlc3RbaV07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlY3Vyc2UgJiYgdHlwZW9mIHRlc3RbaV0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX251bGxfcHJvcGVydGllcyh0ZXN0W2ldLCByZWN1cnNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGVzdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLndlYXRoZXInKS5jb21wb25lbnQoJ3dlYXRoZXJWaWV3ZXInLCB7XHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdidWlsZC9odG1sL3dlYXRoZXIvaW5kZXguaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogV2VhdGhlclZpZXdDb250cm9sbGVyLFxyXG4gICAgICAgIGJpbmRpbmdzOiB7XHJcbiAgICAgICAgICAgIGxvYWRlZFN1cHBsaWVyOiBcIj1cIixcclxuICAgICAgICAgICAgdGFnczogXCI9bG9hZGVkVGFnc1wiLFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgV2VhdGhlclZpZXdDb250cm9sbGVyLiRpbmplY3QgPSBbJ2RhdGFzZXJ2aWNlJywgJ3RvYXN0cicsICckdGltZW91dCddO1xyXG4gICAgZnVuY3Rpb24gV2VhdGhlclZpZXdDb250cm9sbGVyKGRhdGFzZXJ2aWNlLCB0b2FzdHIsICR0aW1lb3V0ICkge1xyXG5cclxuICAgICAgICB2YXIgY3RybCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kb21JZHMgPSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5pdCA9IGluaXQ7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KSgpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
