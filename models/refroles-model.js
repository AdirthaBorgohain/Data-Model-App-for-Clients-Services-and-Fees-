angular.module('myApp.models.refroles', [

])
    .service('RefRolesModel', function () {
        var model = this,
            data = [{ role_code: "rcode1", role_name: "role1" },
            { role_code: "rcode2", role_name: "role2" }
            ];
        model.getRefRoles = function () {
            return data;
        }
    });