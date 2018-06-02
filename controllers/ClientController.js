var duplicate; //To check duplicate entries 

app.controller("ClientController", ['$scope', '$rootScope', 'ClientsModel', function ($scope, $rootScope, ClientsModel) {

	$scope.data = ClientsModel.getClients();

	$scope.clients = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var retcode;
	var newInstance = 1;
	var delcode = 0;

	$rootScope.$on("CallAddCli", function (event, msg, code) {
		retcode = code;
		$scope.addClient(msg);
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
	});

	$rootScope.$on("CheckCDuplicate", function (event, cID) {
		$scope.checkDuplicate(cID);
	});

	$rootScope.$on("CallDelCli", function (event, index) {
		delcode = 1;
		$scope.deleteClient(index);
	});

	$scope.addClient = function (msg) {
		$scope.subEnable = true;
		if (retcode == 1) {
			var emp = {
				client_id: msg,
				currency_code: "",
				client_name: "",
				client_from_date: "",
				kpi_avg_billable_rate: "",
				kpi_billing_to_date: "",
				kpi_client_project_count: "",
				other_client_details: "",
				disableEdit: false
			};
		} else {
			var emp = {
				client_id: "",
				currency_code: msg,
				client_name: "",
				client_from_date: "",
				kpi_avg_billable_rate: "",
				kpi_billing_to_date: "",
				kpi_client_project_count: "",
				other_client_details: "",
				disableEdit: false
			};
		}
		$scope.clients.push(emp);
		$scope.enabledEdit[$scope.clients.length - 1] = true;
		currIndex = $scope.clients.length - 1;
	}
	$scope.editClient = function (index) {
		console.log("edit index" + index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
		newInstance = 0;
	}
	$scope.deleteClient = function (index) {
		$scope.clients.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
		// if (delcode == 0)
			$rootScope.$emit("CallDelP", index);
			$rootScope.$emit("CallDelCA", index);
		// $rootScope.$emit("CallDelRC", index);
		delcode = 0;
	}

	$scope.submitClient = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		// if (newInstance == 1) {
		// 	$rootScope.$emit("CallAddSOP", $scope.projects[currIndex].project_id, 2);
		// }
		if (retcode !== 2) {
			$rootScope.$emit("CheckRCDuplicate", $scope.clients[currIndex].currency_code);
			if (!duplicate) {
				$rootScope.$emit("CallAddRC", $scope.clients[currIndex].currency_code);
				if (newInstance == 1) {
					$rootScope.$emit("CallAddPro", $scope.clients[currIndex].client_id, 3);
					$rootScope.$emit("CallAddCA", $scope.clients[currIndex].client_id, 2);
				}
			} else {
				alert("currency_code already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
			}
		} else {
			// if (newInstance == 1) {
				$rootScope.$emit("CallAddPro", $scope.clients[currIndex].client_id, 3);
				$rootScope.$emit("CallAddCA", $scope.clients[currIndex].client_id, 2);
			// }
		}
		console.log("submitClient called");
		console.log("form submitted:" + angular.toJson($scope.clients));
		newInstance = 1;
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

	$scope.checkDuplicate = function (cID) {
		let obj = $scope.clients.find(o => o.client_id === cID);
		if (obj !== undefined)
			duplicate = true;
		else
			duplicate = false;
	}

}]);