var duplicate; //To check duplicate entries 

app.controller("ClientAddressController", ['$scope', '$rootScope', 'ClientAddressModel', function ($scope, $rootScope, ClientAddressModel) {
	$scope.data = ClientAddressModel.getClientAddress();

	$scope.clientaddresses = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var retcode; //To check in which entity new attribute will be created 

	$rootScope.$on("CallAddCA", function (event, msg, code) {
		$scope.retcode = code;
		$scope.addClientAddress(msg, code);
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
	});

	$rootScope.$on("CallDelCA", function (event, index) {
		$scope.deleteClientAddress(index);
	});

	$scope.addClientAddress = function (msg, code) {
		$scope.subEnable = true;
		if (code == 1) {
			var emp = {
				client_id: "",
				address_id: msg,
				date_address_from: "",
				date_address_to: "",
				disableEdit: false
			};
		} else {
			var emp = {
				client_id: msg,
				address_id: "",
				date_address_from: "",
				date_address_to: "",
				disableEdit: false
			};
		}
		$scope.clientaddresses.push(emp);
		$scope.enabledEdit[$scope.clientaddresses.length - 1] = true;
		currIndex = $scope.clientaddresses.length - 1;
	}
	$scope.editClientAddress = function (index) {
		console.log("edit index" + index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
	}
	$scope.deleteClientAddress = function (index) {
		$scope.clientaddresses.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
	}

	$scope.submitClientAddress = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		if ($scope.retcode == 1) {
			$rootScope.$emit("CheckCDuplicate", $scope.clientaddresses[currIndex].client_id);
			if (!duplicate) {
				$rootScope.$emit("CallAddCli", $scope.clientaddresses[currIndex].client_id, 1);
				$rootScope.$emit("CallAddPro", $scope.clientaddresses[currIndex].client_id, 3);
			} else {
				alert("client_id already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
			}
		} else if ($scope.retcode == 2) {
			$rootScope.$emit("CheckAddrDuplicate", $scope.clientaddresses[currIndex].address_id);
			if (!duplicate) {
				$rootScope.$emit("CallAddAddr", $scope.clientaddresses[currIndex].address_id);
			} else {
				alert("address_id already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
			}
		} else {
			// $rootScope.$emit("CheckSDuplicate", $scope.clientaddresses[currIndex].serviceCode);
			if (!duplicate) {
				// $rootScope.$emit("CallAddSer", $scope.clientaddresses[currIndex].serviceCode);
				// $rootScope.$emit("CheckPDuplicate", $scope.clientaddresses[currIndex].project_id);
				if (!duplicate) {
					// $rootScope.$emit("CallAddPro", $scope.clientaddresses[currIndex].project_id);
				} else {
					alert("project_id already taken");
					$scope.subEnable = true;
					$scope.enabledEdit[currIndex] = true;
				}
			} else {
				alert("service_code already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
			}
		}
		console.log("submitClientAddress called");
		console.log("form submitted:" + angular.toJson($scope.clientaddresses));
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

}]);