var duplicate; //To check duplicate entries 

app.controller("RefCurrenciesController", ['$scope', '$rootScope', 'RefCurrenciesModel', function ($scope, $rootScope, RefCurrenciesModel) {
	$scope.data = RefCurrenciesModel.getRefCurrencies();

	$scope.refcurrencies = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var newInstance = 1;
	var delcode = 0;

	$rootScope.$on("CallAddRC", function (event, msg) {
		$scope.addRefCurrencies(msg);
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
	});

	$rootScope.$on("CheckRCDuplicate", function (event, cc) {
		$scope.checkDuplicate(cc);
	});

	$rootScope.$on("CallDelRC", function (event, index) {
		delcode = 1;
		$scope.deleteRefCurrencies(index);
	});

	$scope.addRefCurrencies = function (msg) {
		$scope.subEnable = true;
		var emp = {
			currency_code: msg,
			currency_name: "",
			nominal_exchange_rate: "",
			disableEdit: false
		};
		$scope.refcurrencies.push(emp);
		$scope.enabledEdit[$scope.refcurrencies.length - 1] = true;
		currIndex = $scope.refcurrencies.length - 1;
	}

	$scope.editRefCurrencies = function (index) {
		console.log("edit index" + index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
		newInstance = 0;
	}
	$scope.deleteRefCurrencies = function (index) {
		$scope.refcurrencies.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
		if (delcode == 0)
			$rootScope.$emit("CallDelCli", index);
		delcode = 0;
	}

	$scope.submitRefCurrencies = function () {

		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		if (newInstance == 1)
			$rootScope.$emit("CallAddCli", $scope.refcurrencies[currIndex].currency_code, 2);
		console.log("submitrefCurrencies called");
		console.log("form submitted:" + angular.toJson($scope.refcurrencies));
		newInstance = 1;
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

	$scope.checkDuplicate = function (cc) {
		let obj = $scope.refcurrencies.find(o => o.currency_code === cc);
		if (obj !== undefined)
			duplicate = true;
		else
			duplicate = false;
	}

}]);