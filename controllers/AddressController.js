var duplicate; //To check duplicate entries 

app.controller("AddressController", ['$scope', '$rootScope', 'AddressModel', function ($scope, $rootScope, AddressModel) {
	$scope.data = AddressModel.getAddress();

	$scope.addresses = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var newInstance = 1;
	var delcode = 0;

	$rootScope.$on("CallAddAddr", function (event, msg) {
		$scope.addAddress(msg);
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
	});

	$rootScope.$on("CheckAddrDuplicate", function (event, aID) {
		$scope.checkDuplicate(aID);
	});

	$rootScope.$on("CallDelAddr", function (event, index) {
		delcode = 1;
		$scope.deleteAddress(index);
	});

	$scope.addAddress = function (msg) {
		$scope.subEnable = true;
		var emp = {
			address_id: msg,
			line_1_no_building: "",
			line_2_no_street: "",
			line_3_area_locality: "",
			town_city: "",
			state_province: "",
			country_code: "",
			disableEdit: false
		};
		$scope.addresses.push(emp);
		$scope.enabledEdit[$scope.addresses.length - 1] = true;
		currIndex = $scope.addresses.length - 1;
	}

	$scope.editAddress = function (index) {
		console.log("edit index" + index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
		newInstance = 0;
	}
	$scope.deleteAddress = function (index) {
		$scope.addresses.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
		if (delcode == 0)
			$rootScope.$emit("CallDelCA", index);
		delcode = 0;
	}

	$scope.submitAddress = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		if (newInstance == 1)
			$rootScope.$emit("CallAddCA", $scope.addresses[currIndex].address_id, 1);
		console.log("submitAddress called");
		console.log("form submitted:" + angular.toJson($scope.addresses));
		newInstance = 1;
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

	$scope.checkDuplicate = function (aID) {
		let obj = $scope.addresses.find(o => o.address_id === aID);
		if (obj !== undefined)
			duplicate = true;
		else
			duplicate = false;
	}

}]);
