angular.module('myApp.models.clients', [

])
    .service('ClientsModel', function () {
        var d = new Date;
        var model = this,
            data = [{ client_id: "CID1", currency_code: "CC1", client_name: "cname1", client_from_date: d, kpi_avg_billable_rate: "kabr1", kpi_billing_to_date: "kbtd1", kpi_client_project_count: "kcpc1", other_client_details: "ocd1" },
            { client_id: "CID2", currency_code: "CC2", client_name: "cname2", client_from_date: d, kpi_avg_billable_rate: "kabr2", kpi_billing_to_date: "kbtd2", kpi_client_project_count: "kcpc2", other_client_details: "ocd2" }
            ];
        model.getClients = function () {
            return data;
        }
    });