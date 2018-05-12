angular.module('myApp.models.services', [

])
    .service('ServicesModel', function () {
        var model = this,
            data = [{ serviceCode: "abc", parent_service_code: "PS1", service_name: "dummy" },
            { serviceCode: "xyz", parent_service_code: "PS2", service_name: "service2" }
            ];
        model.getServices = function () {
            return data;
        }
    });