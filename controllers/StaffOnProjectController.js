var duplicate; //To check duplicate entries 

app.controller("StaffOnProjectController", ['$scope', '$rootScope', 'StaffsOnProjectModel', function ($scope, $rootScope, StaffsOnProjectModel) {
	$scope.data = StaffsOnProjectModel.getStaffsOnProject();

	$scope.staffsonproject = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var retcode; //To check in which entity new attribute will be created 

	$rootScope.$on("CallAddStOP", function (event, msg, code) {
		retcode = code;
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
		if (retcode == 1) {
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
		} else if (retcode == 2) {
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
		} else if (retcode == 3) {
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