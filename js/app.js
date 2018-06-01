var app = angular.module('myApp', [
	'myApp.models.services',
	'myApp.models.servicesonproject',
	'myApp.models.projects',
	'myApp.models.clients',
	'myApp.models.refcurrencies',
	'myApp.models.staffs'
]);

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


app.controller("ServiceOnProject", ['$scope', '$rootScope', 'ServicesOnProjectModel', function ($scope, $rootScope, ServicesOnProjectModel) {
	$scope.data = ServicesOnProjectModel.getServicesOnProject();

	$scope.servicesonproject = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var retcode; //To check in which entity new attribute will be created 
	//var duplicate; //To check duplicate entries 

	$rootScope.$on("CallAddSOP", function (event, msg, code) {
		$scope.retcode = code;
		$scope.addServiceOnProject(msg, code);
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
	});

	$rootScope.$on("CallDelSOP", function (event, index) {
		$scope.deleteServiceOnProject(index);
	});

	$scope.addServiceOnProject = function (msg, code) {
		$scope.subEnable = true;
		if (code == 1) {
			var emp = {
				serviceCode: msg,
				project_id: "",
				disableEdit: false
			};
		} else {
			var emp = {
				serviceCode: "",
				project_id: msg,
				disableEdit: false
			};
		}
		$scope.servicesonproject.push(emp);
		$scope.enabledEdit[$scope.servicesonproject.length - 1] = true;
		currIndex = $scope.servicesonproject.length - 1;
	}
	$scope.editServiceOnProject = function (index) {
		console.log("edit index" + index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
	}
	$scope.deleteServiceOnProject = function (index) {
		$scope.servicesonproject.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
	}

	$scope.submitServiceOnProject = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		if ($scope.retcode == 1) {
			$rootScope.$emit("CheckPDuplicate", $scope.servicesonproject[currIndex].project_id);
			if (!duplicate)
				$rootScope.$emit("CallAddPro", $scope.servicesonproject[currIndex].project_id);
			else {
				alert("project_id already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
			}
		} else if ($scope.retcode == 2) {
			$rootScope.$emit("CheckSDuplicate", $scope.servicesonproject[currIndex].serviceCode);
			if (!duplicate)
				$rootScope.$emit("CallAddSer", $scope.servicesonproject[currIndex].serviceCode);
			else {
				alert("service_code already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
			}
		} else {
			$rootScope.$emit("CheckSDuplicate", $scope.servicesonproject[currIndex].serviceCode);
			if (!duplicate) {
				$rootScope.$emit("CallAddSer", $scope.servicesonproject[currIndex].serviceCode);
				$rootScope.$emit("CheckPDuplicate", $scope.servicesonproject[currIndex].project_id);
				if (!duplicate)
					$rootScope.$emit("CallAddPro", $scope.servicesonproject[currIndex].project_id);
				else {
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
		console.log("submitServiceOnProject called");
		console.log("form submitted:" + angular.toJson($scope.servicesonproject));
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

}]);


app.controller("ProjectController", ['$scope', '$rootScope', 'ProjectsModel', function ($scope, $rootScope, ProjectsModel) {

	$scope.data = ProjectsModel.getProjects();

	$scope.projects = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var newInstance = 1;

	$rootScope.$on("CallAddPro", function (event, msg, code) {
		$scope.addProject(msg, code);
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
	});

	$rootScope.$on("CheckPDuplicate", function (event, pID) {
		$scope.checkDuplicate(pID);
	});

	$rootScope.$on("CallDelP", function (event, index) {
		$scope.deleteProject(index);
	});

	$scope.addProject = function (msg, code) {
		$scope.subEnable = true;
		if (code == 3) {
			var emp = {
				project_id: "",
				client_id: msg,
				project_name: "",
				project_start_date: "",
				project_end_date: "",
				project_description: "",
				other_project_details: "",
				disableEdit: false
			};
		} else {
			var emp = {
				project_id: msg,
				client_id: "",
				project_name: "",
				project_start_date: "",
				project_end_date: "",
				project_description: "",
				other_project_details: "",
				disableEdit: false
			};
		}
		$scope.projects.push(emp);
		$scope.enabledEdit[$scope.projects.length - 1] = true;
		currIndex = $scope.projects.length - 1;
		newInstance = 2;
	}
	$scope.editProject = function (index) {
		console.log("edit index" + index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
		if ($scope.projects[index].project_id == "" && $scope.projects[index].client_id != "")
			newInstance = 1;
		else
			newInstance = 0;
	}
	$scope.deleteProject = function (index) {
		$scope.projects.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
		$rootScope.$emit("CallDelSOP", index);
		$rootScope.$emit("CallDelCli", index);
	}

	$scope.submitProject = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		$rootScope.$emit("CheckCDuplicate", $scope.projects[currIndex].client_id);
		if (newInstance == 1) {
			if (!duplicate) {
				$rootScope.$emit("CallAddSOP", $scope.projects[currIndex].project_id, 2);
				console.log("THIS IS THE 1st IF");
			}
		} else if (newInstance == 0) {
			if (!duplicate) {
				$rootScope.$emit("CallAddCli", $scope.projects[currIndex].client_id, 1);
				newInstance = 1;
				console.log("THIS IS THE 2nd IF");
			} else {
				alert("Client_id already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
				console.log("THIS IS THE 3rd IF");
			}
		} else {
			if (!duplicate) {
				$rootScope.$emit("CallAddSOP", $scope.projects[currIndex].project_id, 2);
				$rootScope.$emit("CallAddCli", $scope.projects[currIndex].client_id, 1);
				newInstance = 1;
				console.log("THIS IS THE 4th IF");
			} else {
				alert("Client_ID already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
				console.log("THIS IS THE 5th IF");
			}
		}
		console.log("submitProject called");
		console.log("form submitted:" + angular.toJson($scope.projects));
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

	$scope.checkDuplicate = function (pID) {
		let obj = $scope.projects.find(o => o.project_id === pID);
		if (obj !== undefined)
			duplicate = true;
		else
			duplicate = false;
	}
}]);






app.controller("ClientController", ['$scope', '$rootScope', 'ClientsModel', function ($scope, $rootScope, ClientsModel) {

	$scope.data = ClientsModel.getClients();

	$scope.clients = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var retcode;
	var newInstance = 1;

	$rootScope.$on("CallAddCli", function (event, msg, code) {
		$scope.retcode = code;
		$scope.addClient(msg);
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
	});

	$rootScope.$on("CheckCDuplicate", function (event, cID) {
		$scope.checkDuplicate(cID);
	});

	$rootScope.$on("CallDelCli", function (event, index) {
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
		$rootScope.$emit("CallDelP", index);
		$rootScope.$emit("CallDelRC", index);
	}

	$scope.submitClient = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		// if (newInstance == 1) {
		// 	$rootScope.$emit("CallAddSOP", $scope.projects[currIndex].project_id, 2);
		// }
		$rootScope.$emit("CallAddRC", $scope.clients[currIndex].currency_code);
		if (newInstance == 1)
			$rootScope.$emit("CallAddPro", $scope.clients[currIndex].client_id, 3);
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


app.controller("RefCurrencies", ['$scope', '$rootScope', 'RefCurrenciesModel', function ($scope, $rootScope, RefCurrenciesModel) {
	$scope.data = RefCurrenciesModel.getRefCurrencies();

	$scope.refcurrencies = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var newInstance = 1;

	$rootScope.$on("CallAddRC", function (event, msg) {
		$scope.addRefCurrencies(msg);
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
	});

	$rootScope.$on("CallDelRC", function (event, index) {
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

	// $scope.addRefCurrencies = function (msg, code) {
	// 	$scope.subEnable = true;
	// 	if (code == 1) {
	// 		var emp = {
	// 			currency_code: msg,
	// 			currency_name: "",
	// 			nominal_exchange_rate: "",
	// 			disableEdit: false
	// 		};
	// 	} else {
	// 		var emp = {
	// 			currency_code: "",
	// 			currency_name: msg,
	// 			nominal_exchange_rate: "",
	// 			disableEdit: false
	// 		};
	// 	}
	// 	$scope.refcurrencies.push(emp);
	// 	$scope.enabledEdit[$scope.refcurrencies.length - 1] = true;
	// 	currIndex = $scope.refcurrencies.length - 1;
	// 	$scope.subEnable = false;
	// 	$scope.enabledEdit[currIndex] = false;
	// }

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
		$rootScope.$emit("CallDelCli", index);
	}

	$scope.submitRefCurrencies = function () {

		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		if (newInstance == 1)
			$rootScope.$emit("CallAddCli", $scope.refcurrencies[currIndex].currency_code, 2);
		console.log("submitrefCurrencies called");
		console.log("form submitted:" + angular.toJson($scope.refcurrencies));
		newInstance = 1;


		// $scope.subEnable = false;
		// $scope.enabledEdit[currIndex] = false;
		// if ($scope.retcode == 1) {
		// 	$rootScope.$emit("CheckPDuplicate", $scope.refcurrencies[currIndex].project_id);
		// 	if (!duplicate)
		// 		$rootScope.$emit("CallAddPro", $scope.refcurrencies[currIndex].project_id);
		// 	else {
		// 		alert("project_id already taken");
		// 		$scope.subEnable = true;
		// 		$scope.enabledEdit[currIndex] = true;
		// 	}
		// } else {
		// 	$rootScope.$emit("CheckSDuplicate", $scope.refcurrencies[currIndex].serviceCode);
		// 	if (!duplicate)
		// 		$rootScope.$emit("CallAddSer", $scope.refcurrencies[currIndex].serviceCode);
		// 	else {
		// 		alert("service_code already taken");
		// 		$scope.subEnable = true;
		// 		$scope.enabledEdit[currIndex] = true;
		// 	}
		// }
		// console.log("submitRefCurrencies called");
		// console.log("form submitted:" + angular.toJson($scope.refcurrencies));
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

}]);




app.controller("StaffController", ['$scope', 'StaffsModel', function ($scope, StaffsModel) {

	$scope.data = StaffsModel.getStaffs();


	$scope.staffs = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;

	$scope.addStaff = function () {
		$scope.subEnable = true;
		var emp = {
			staff_id: "",
			staff_name: "",
			gender_MF: "",
			date_of_birth: "",
			daily_cost: "",
			daily_rate: "",
			date_joined: "",
			date_left: "dummy",
			other_staff_details: "dummy",
			disableEdit: false
		};
		$scope.staffs.push(emp);
		$scope.enabledEdit[$scope.staffs.length - 1] = true;
		currIndex = $scope.staffs.length - 1;
	}
	$scope.editStaff = function (index) {
		console.log("edit index" + index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
	}
	$scope.deleteStaff = function (index) {
		$scope.staffs.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
	}

	$scope.submitStaff = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		console.log("submitStaff called");
		console.log("form submitted:" + angular.toJson($scope.staffs));
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

}]);