var duplicate; //To check duplicate entries 

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