var duplicate; //To check duplicate entries 

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