angular.module('myApp.models.staffs', [

])
    .service('StaffsModel', function () {
        var d = new Date;
        var model = this,
            data = [{ staff_id: "abc", staff_name: "PS1", gender_MF: "dummy", date_of_birth: d, daily_cost: "dummy", daily_rate: "dummy", date_joined: d, date_left: d, other_staff_details: "dummy" },
            { staff_id: "xyz", staff_name: "PS2", gender_MF: "service2", date_of_birth: d, daily_cost: "dummy", daily_rate: "dummy", date_joined: d, date_left: d, other_staff_details: "dummy" }
            ];
        model.getStaffs = function () {
            return data;
        }
    });