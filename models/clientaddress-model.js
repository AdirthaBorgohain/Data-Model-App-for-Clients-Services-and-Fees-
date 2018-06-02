angular.module('myApp.models.clientaddress', [

])
    .service('ClientAddressModel', function () {
        var d = new Date;
        var model = this,
            data = [{ client_id: "CID1", address_id: "addr1", date_address_from:d, date_address_to: d },
            { client_id: "CID2", address_id: "addr2", date_address_from: d, date_address_to: d }
            ];
        model.getClientAddress = function () {
            return data;
        }
    });