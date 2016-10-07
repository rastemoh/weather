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