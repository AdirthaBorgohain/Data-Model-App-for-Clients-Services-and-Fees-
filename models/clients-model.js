angular.module('myApp.models.clients', [

])
    .service('ClientsModel', function () {
        var d = new Date;
        var model = this,
            data = [{ client_id: "PS1", currency_code: "abc", client_name: "PS1", client_from_date: d, kpi_avg_billable_rate: "dummy", kpi_billing_to_date: "dummy", kpi_client_project_count: "dummy", other_client_details: "dummy" },
            { client_id: "PS2", currency_code: "xyz", client_name: "PS2", client_from_date: d, kpi_avg_billable_rate: "dummy", kpi_billing_to_date: "dummy", kpi_client_project_count: "dummy", other_client_details: "dummy" }
            ];
        model.getClients = function () {
            return data;
        }
    });