angular.module('myApp.models.staffsonproject', [

])
    .service('StaffsOnProjectModel', function () {
        var model = this,
            data = [{ staff_on_project_period_id: "dummy1", project_id: "PID1", staff_id: "SIDa", role_code: "rcode1", from_datetime: "fdt1", to_datetime: "tdt1", hourly_rate: "hr1" },
            { staff_on_project_period_id: "dummy2", project_id: "PID2", staff_id: "SIDb", role_code: "rcode2", from_datetime: "fdt2", to_datetime: "tdt2", hourly_rate: "hr2" }
            ];
        model.getStaffsOnProject = function () {
            return data;
        }
    });