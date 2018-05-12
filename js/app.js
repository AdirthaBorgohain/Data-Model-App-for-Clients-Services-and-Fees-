var app = angular.module('myApp', [
	'myApp.models.services',
	'myApp.models.projects',
	'myApp.models.clients',
	'myApp.models.staffs'
]);


app.controller("ServiceController", ['$scope', 'ServicesModel', function ($scope, ServicesModel) {
	$scope.data = ServicesModel.getServices();

	$scope.services = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;

	$scope.addService = function () {
		$scope.subEnable = true;
		var emp = { serviceCode: "", parent_service_code: "", service_name: "", disableEdit: false };
		$scope.services.push(emp);
		$scope.enabledEdit[$scope.services.length - 1] = true;
		currIndex = $scope.services.length - 1;
	}
	$scope.editService = function (index) {
		console.log("edit index" + index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
	}
	$scope.deleteService = function (index) {
		$scope.services.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
	}

	$scope.submitService = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		console.log("submitService called");
		console.log("form submitted:" + angular.toJson($scope.services));
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

}]);

app.controller("ProjectController", ['$scope', 'ProjectsModel', function ($scope, ProjectsModel) {

	$scope.data = ProjectsModel.getProjects();

	$scope.projects = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;

	$scope.addProject = function () {
		$scope.subEnable = true;
		var emp = { project_id: "", client_id: "", project_name: "", project_start_date: "", project_end_date: "", project_description: "", other_project_details: "", disableEdit: false };
		$scope.projects.push(emp);
		$scope.enabledEdit[$scope.projects.length - 1] = true;
		currIndex = $scope.projects.length - 1;
	}
	$scope.editProject = function (index) {
		console.log("edit index" + index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
	}
	$scope.deleteProject = function (index) {
		$scope.projects.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
	}

	$scope.submitProject = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		console.log("submitProject called");
		console.log("form submitted:" + angular.toJson($scope.projects));
	}

	$scope.checkSub = function () {
		return ($scope.subEnable);
	}

}]);

app.controller("ClientController", ['$scope', 'ClientsModel', function ($scope, ClientsModel) {

	$scope.data = ClientsModel.getClients();

	$scope.clients = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;

	$scope.addClient = function () {
		$scope.subEnable = true;
		var emp = { currency_code: "", client_name: "", client_from_date: "", kpi_avg_billable_rate: "", kpi_billing_to_date: "", kpi_client_project_count: "", other_client_details: "", disableEdit: false };
		$scope.clients.push(emp);
		$scope.enabledEdit[$scope.clients.length - 1] = true;
		currIndex = $scope.clients.length - 1;
	}
	$scope.editClient = function (index) {
		console.log("edit index" + index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
	}
	$scope.deleteClient = function (index) {
		$scope.clients.splice(index, 1);
		currIndex = index - 1;
		$scope.subEnable = false;
	}

	$scope.submitClient = function () {
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		console.log("submitClient called");
		console.log("form submitted:" + angular.toJson($scope.clients));
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
		var emp = { staff_id: "", staff_name: "", gender_MF: "", date_of_birth: "", daily_cost: "", daily_rate: "", date_joined: "", date_left: "dummy", other_staff_details: "dummy", disableEdit: false };
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