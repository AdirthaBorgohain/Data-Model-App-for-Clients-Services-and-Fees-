angular.module('myApp.models.refcurrencies', [

])
    .service('RefCurrenciesModel', function () {
        var model = this,
            data = [{ currency_code: "abc", currency_name: "dummy", nominal_exchange_rate: "random" },
            { currency_code: "xyz", currency_name: "dummy2", nominal_exchange_rate: "random2" }
            ];
        model.getRefCurrencies = function () {
            return data;
        }
    });