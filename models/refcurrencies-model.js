angular.module('myApp.models.refcurrencies', [

])
    .service('RefCurrenciesModel', function () {
        var model = this,
            data = [{ currency_code: "CC1", currency_name: "ccname1", nominal_exchange_rate: "ner1" },
            { currency_code: "CC2", currency_name: "ccname2", nominal_exchange_rate: "ner2" }
            ];
        model.getRefCurrencies = function () {
            return data;
        }
    });