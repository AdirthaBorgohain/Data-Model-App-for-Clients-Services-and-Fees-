angular.module('myApp.models.servicesonproject', [

])
    .service('ServicesOnProjectModel', function () {
        var model = this,
            data = [{ serviceCode: "abc", project_id: "dummy" },
            { serviceCode: "xyz", project_id: "dummy2" }
            ];
        model.getServicesOnProject = function () {
            return data;
        }
    });