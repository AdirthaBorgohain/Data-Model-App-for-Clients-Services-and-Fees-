angular.module('myApp.models.staffs', [

])
    .service('StaffsModel', function () {
        var d = new Date;
        var model = this,
            data = [{ staff_id: "SIDa", staff_name: "sname1", gender_MF: "MF1", date_of_birth: d, daily_cost: "dcost1", daily_rate: "drate1", date_joined: d, date_left: d, other_staff_details: "osd1" },
            { staff_id: "SIDb", staff_name: "sname2", gender_MF: "MF2", date_of_birth: d, daily_cost: "dcost2", daily_rate: "drate2", date_joined: d, date_left: d, other_staff_details: "osd2" }
            ];
        model.getStaffs = function () {
            return data;
        }
    });