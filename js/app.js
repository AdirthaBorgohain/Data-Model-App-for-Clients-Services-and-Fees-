var app = angular.module('myApp', [
	'myApp.models.services',
	'myApp.models.servicesonproject',
	'myApp.models.projects',
	'myApp.models.clients',
	'myApp.models.clientaddress',
	'myApp.models.address',
	'myApp.models.refcurrencies',
	'myApp.models.staffs',
	'myApp.models.refroles',
	'myApp.models.staffsonproject'
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


app.controller("ServiceOnProjectController", ['$scope', '$rootScope', 'ServicesOnProjectModel', function ($scope, $rootScope, ServicesOnProjectModel) {
	$scope.data = ServicesOnProjectModel.getServicesOnProject();

	$scope.servicesonproject = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var retcode; //To check in which entity new attribute will be created 

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
	var delcode = 0; //To prevent looping of delete function

	$rootScope.$on("CallAddPro", function (event, msg, code) {
		$scope.addProject(msg, code);
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
	});

	$rootScope.$on("CheckPDuplicate", function (event, pID) {
		$scope.checkDuplicate(pID);
	});

	$rootScope.$on("CallDelP", function (event, index) {
		delcode = 1;
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
		// if (delcode == 0)
		// 	$rootScope.$emit("CallDelCli", index);
		$rootScope.$emit("CallDelSOP", index);
		$rootScope.$emit("CallDelStOP", index);

		delcode = 0;
	}

	$scope.submitProject = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		$rootScope.$emit("CheckCDuplicate", $scope.projects[currIndex].client_id);
		if (newInstance == 1) {
			// if (!duplicate) {
			$rootScope.$emit("CallAddSOP", $scope.projects[currIndex].project_id, 2);
			$rootScope.$emit("CallAddStOP", $scope.projects[currIndex].project_id, 1);
			// }
		} else if (newInstance == 0) {
			if (!duplicate) {
				$rootScope.$emit("CallAddCli", $scope.projects[currIndex].client_id, 1);
				$rootScope.$emit("CallAddStOP", $scope.projects[currIndex].project_id, 1);
				newInstance = 1;
			} else {
				alert("Client_id already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
			}
		} else {
			if (!duplicate) {
				$rootScope.$emit("CallAddSOP", $scope.projects[currIndex].project_id, 2);
				$rootScope.$emit("CallAddStOP", $scope.projects[currIndex].project_id, 1);
				$rootScope.$emit("CallAddCli", $scope.projects[currIndex].client_id, 1);
				newInstance = 1;
			} else {
				alert("Client_ID already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
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




app.controller("StaffController", ['$scope', '$rootScope', 'StaffsModel', function ($scope, $rootScope, StaffsModel) {

	$scope.data = StaffsModel.getStaffs();


	$scope.staffs = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var newInstance = 1;

	$rootScope.$on("CallAddSt", function (event, msg) {
		$scope.addStaff(msg);
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
	});

	$rootScope.$on("CheckStDuplicate", function (event, sID) {
		$scope.checkDuplicate(sID);
	});

	// $rootScope.$on("CallDelRC", function (event, index) {
	// 	delcode = 1;
	// 	$scope.deleteRefCurrencies(index);
	// });

	$scope.addStaff = function (msg) {
		$scope.subEnable = true;
		var emp = {
			staff_id: msg,
			staff_name: "",
			gender_MF: "",
			date_of_birth: "",
			daily_cost: "",
			daily_rate: "",
			date_joined: "",
			date_left: "",
			other_staff_details: "",
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
		newInstance = 0;
	}
	$scope.deleteStaff = function (index) {
		$scope.staffs.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
		$rootScope.$emit("CallDelStOP", index);
	}

	$scope.submitStaff = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		if (newInstance == 1)
			$rootScope.$emit("CallAddStOP", $scope.staffs[currIndex].staff_id, 2);
		console.log("submitStaff called");
		console.log("form submitted:" + angular.toJson($scope.staffs));
		newInstance = 1;
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

	$scope.checkDuplicate = function (sID) {
		let obj = $scope.staffs.find(o => o.staff_id === sID);
		if (obj !== undefined)
			duplicate = true;
		else
			duplicate = false;
	}
}]);


app.controller("RefRolesController", ['$scope', '$rootScope', 'RefRolesModel', function ($scope, $rootScope, RefRolesModel) {
	$scope.data = RefRolesModel.getRefRoles();

	$scope.refroles = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var newInstance = 1;

	$rootScope.$on("CallAddRR", function (event, msg) {
		$scope.addRefRoles(msg);
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
	});

	$rootScope.$on("CheckRRDuplicate", function (event, rCode) {
		$scope.checkDuplicate(rCode);
	});

	$rootScope.$on("CallDelRR", function (event, index) {
		$scope.deleteRefRoles(index);
	});

	$scope.addRefRoles = function (msg) {
		$scope.subEnable = true;
		var emp = {
			role_code: msg,
			role_name: "",
			disableEdit: false
		};
		$scope.refroles.push(emp);
		$scope.enabledEdit[$scope.refroles.length - 1] = true;
		currIndex = $scope.refroles.length - 1;
	}

	$scope.editRefRoles = function (index) {
		console.log("edit index" + index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
		newInstance = 0;
	}
	$scope.deleteRefRoles = function (index) {
		$scope.refroles.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
		$rootScope.$emit("CallDelStOP", index);
	}

	$scope.submitRefRoles = function () {

		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		if (newInstance == 1)
			$rootScope.$emit("CallAddStOP", $scope.refroles[currIndex].role_code, 3);
		console.log("submitRefRoles called");
		console.log("form submitted:" + angular.toJson($scope.refroles));
		newInstance = 1;
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

	$scope.checkDuplicate = function (rCode) {
		let obj = $scope.refroles.find(o => o.role_code === rCode);
		if (obj !== undefined)
			duplicate = true;
		else
			duplicate = false;
	}

}]);

app.controller("StaffOnProjectController", ['$scope', '$rootScope', 'StaffsOnProjectModel', function ($scope, $rootScope, StaffsOnProjectModel) {
	$scope.data = StaffsOnProjectModel.getStaffsOnProject();

	$scope.staffsonproject = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var retcode; //To check in which entity new attribute will be created 

	$rootScope.$on("CallAddStOP", function (event, msg, code) {
		$scope.retcode = code;
		$scope.addStaffOnProject(msg, code);
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
	});

	$rootScope.$on("CallDelStOP", function (event, index) {
		$scope.deleteStaffOnProject(index);
	});

	$scope.addStaffOnProject = function (msg, code) {
		$scope.subEnable = true;
		if (code == 1) {
			var emp = {
				staff_on_project_period_id: "",
				project_id: msg,
				staff_id: "",
				role_code: "",
				from_datetime: "",
				to_datetime: "",
				hourly_rate: "",
				disableEdit: false
			};
		} else if (code == 2) {
			var emp = {
				staff_on_project_period_id: "",
				project_id: "",
				staff_id: msg,
				role_code: "",
				from_datetime: "",
				to_datetime: "",
				hourly_rate: "",
				disableEdit: false
			};
		} else {
			var emp = {
				staff_on_project_period_id: "",
				project_id: "",
				staff_id: "",
				role_code: msg,
				from_datetime: "",
				to_datetime: "",
				hourly_rate: "",
				disableEdit: false
			};
		}
		$scope.staffsonproject.push(emp);
		$scope.enabledEdit[$scope.staffsonproject.length - 1] = true;
		currIndex = $scope.staffsonproject.length - 1;
	}
	$scope.editStaffOnProject = function (index) {
		console.log("edit index" + index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
	}
	$scope.deleteStaffOnProject = function (index) {
		$scope.staffsonproject.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
	}

	$scope.submitStaffOnProject = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		if ($scope.retcode == 1) {
			$rootScope.$emit("CheckStDuplicate", $scope.staffsonproject[currIndex].staff_id);
			if (!duplicate) {
				$rootScope.$emit("CheckRRDuplicate", $scope.staffsonproject[currIndex].role_code);
				if (!duplicate) {
					$rootScope.$emit("CallAddSt", $scope.staffsonproject[currIndex].staff_id);
					$rootScope.$emit("CallAddRR", $scope.staffsonproject[currIndex].role_code);
				} else {
					alert("role_code already taken");
					$scope.subEnable = true;
					$scope.enabledEdit[currIndex] = true;
				}
			} else {
				alert("staff_id already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
			}
		} else if ($scope.retcode == 2) {
			$rootScope.$emit("CheckPDuplicate", $scope.staffsonproject[currIndex].project_id);
			if (!duplicate) {
				$rootScope.$emit("CheckRRDuplicate", $scope.staffsonproject[currIndex].role_code);
				if (!duplicate) {
					$rootScope.$emit("CallAddPro", $scope.staffsonproject[currIndex].project_id);
					$rootScope.$emit("CallAddRR", $scope.staffsonproject[currIndex].role_code);
				} else {
					alert("role_code already taken");
					$scope.subEnable = true;
					$scope.enabledEdit[currIndex] = true;
				}
			} else {
				alert("project_id already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
			}
		} else if ($scope.retcode == 3) {
			$rootScope.$emit("CheckPDuplicate", $scope.staffsonproject[currIndex].project_id);
			if (!duplicate) {
				$rootScope.$emit("CheckStDuplicate", $scope.staffsonproject[currIndex].staff_id);
				if (!duplicate) {
					$rootScope.$emit("CallAddPro", $scope.staffsonproject[currIndex].project_id);
					$rootScope.$emit("CallAddSt", $scope.staffsonproject[currIndex].staff_id);
				} else {
					alert("staff_id already taken");
					$scope.subEnable = true;
					$scope.enabledEdit[currIndex] = true;
				}
			} else {
				alert("project_id already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
			}
		} else {
			$rootScope.$emit("CheckPDuplicate", $scope.staffsonproject[currIndex].project_id);
			if (!duplicate) {
				$rootScope.$emit("CheckStDuplicate", $scope.staffsonproject[currIndex].staff_id);
				if (!duplicate) {
					$rootScope.$emit("CheckRRDuplicate", $scope.staffsonproject[currIndex].role_code);
					if (!duplicate) {
						$rootScope.$emit("CallAddPro", $scope.staffsonproject[currIndex].project_id);
						$rootScope.$emit("CallAddSt", $scope.staffsonproject[currIndex].staff_id);
						$rootScope.$emit("CallAddRR", $scope.staffsonproject[currIndex].role_code);
					} else {
						alert("role_code already taken");
						$scope.subEnable = true;
						$scope.enabledEdit[currIndex] = true;
					}
				} else {
					alert("staff_id already taken");
					$scope.subEnable = true;
					$scope.enabledEdit[currIndex] = true;
				}
			} else {
				alert("project_id already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
			}
		}
		console.log("submitStaffOnProject called");
		console.log("form submitted:" + angular.toJson($scope.staffsonproject));
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

}]);