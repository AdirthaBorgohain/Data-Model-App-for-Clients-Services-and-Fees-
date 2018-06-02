angular.module('myApp.models.servicesonproject', [

])
    .service('ServicesOnProjectModel', function () {
        var model = this,
            data = [{ serviceCode: "SC1", project_id: "PID1" },
            { serviceCode: "SC2", project_id: "PID2" }
            ];
        model.getServicesOnProject = function () {
            return data;
        }
    });