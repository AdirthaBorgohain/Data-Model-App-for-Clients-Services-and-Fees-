var duplicate; //To check duplicate entries 

app.controller("ServiceOnProjectController", ['$scope', '$rootScope', 'ServicesOnProjectModel', function ($scope, $rootScope, ServicesOnProjectModel) {
	$scope.data = ServicesOnProjectModel.getServicesOnProject();

	$scope.servicesonproject = angular.copy($scope.data);
	$scope.enabledEdit = [];
	$scope.subEnable = false;
	var currIndex;
	var retcode; //To check in which entity new attribute will be created 

	$rootScope.$on("CallAddSOP", function (event, msg, code) {
		retcode = code;
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
		if (retcode == 1) {
			$rootScope.$emit("CheckPDuplicate", $scope.servicesonproject[currIndex].project_id);
			if (!duplicate)
				$rootScope.$emit("CallAddPro", $scope.servicesonproject[currIndex].project_id);
			else {
				alert("project_id already taken");
				$scope.subEnable = true;
				$scope.enabledEdit[currIndex] = true;
			}
		} else if (retcode == 2) {
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
				$rootScope.$emit("CheckPDuplicate", $scope.servicesonproject[currIndex].project_id);
				if (!duplicate){
					$rootScope.$emit("CallAddSer", $scope.servicesonproject[currIndex].serviceCode);
					$rootScope.$emit("CallAddPro", $scope.servicesonproject[currIndex].project_id);
				}
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