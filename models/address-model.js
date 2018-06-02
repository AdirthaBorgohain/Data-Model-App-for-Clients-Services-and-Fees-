angular.module('myApp.models.address', [

])
    .service('AddressModel', function () {
        var model = this,
            data = [{ address_id: "addr1", line_1_no_building: "building1", line_2_no_street: "street1", line_3_area_locality: "locality1", town_city: "town1", state_province: "state1", country_code: "country" },
            { address_id: "addr2", line_1_no_building: "building2", line_2_no_street: "street2", line_3_area_locality: "locality2", town_city: "town2", state_province: "state2", country_code: "country" }
            ];
        model.getAddress = function () {
            return data;
        }
    });