angular.module('myApp.models.services', [

])
    .service('ServicesModel', function () {
        var model = this,
            data = [{ serviceCode: "SC1", parent_service_code: "PS1", service_name: "SN1" },
            { serviceCode: "SC2", parent_service_code: "PS2", service_name: "SN2" }
            ];
        model.getServices = function () {
            return data;
        }
    });