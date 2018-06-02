var duplicate; //To check duplicate entries 

app.controller("ServiceController", ['$scope', '$rootScope', 'ServicesModel', function ($scope, $rootScope, ServicesModel) {
	$scope.data = ServicesModel.getServices();

	$scope.services = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var newInstance = 1; //To check if a new instance of the entity is needed to be created

	$rootScope.$on("CallAddSer", function (event, msg) {
		$scope.addService(msg);
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
	});

	$rootScope.$on("CheckSDuplicate", function (event, sC) {
		$scope.checkDuplicate(sC);
	});

	$scope.addService = function (msg) {
		$scope.subEnable = true;
		var emp = {
			serviceCode: msg,
			parent_service_code: "",
			service_name: "",
			disableEdit: false
		};
		$scope.services.push(emp);
		$scope.enabledEdit[$scope.services.length - 1] = true;
		currIndex = $scope.services.length - 1;
	}
	$scope.editService = function (index) {
		console.log("edit index" + index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
		newInstance = 0;
	}
	$scope.deleteService = function (index) {
		$scope.services.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
		$rootScope.$emit("CallDelSOP", index);
	}

	$scope.submitService = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		if (newInstance == 1)
			$rootScope.$emit("CallAddSOP", $scope.services[currIndex].serviceCode, 1);
		console.log("submitService called");
		console.log("form submitted:" + angular.toJson($scope.services));
		newInstance = 1;
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

	$scope.checkDuplicate = function (sC) {
		let obj = $scope.services.find(o => o.serviceCode === sC);
		if (obj !== undefined)
			duplicate = true;
		else
			duplicate = false;
	}

}]);
