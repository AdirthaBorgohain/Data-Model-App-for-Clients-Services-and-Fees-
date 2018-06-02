var duplicate; //To check duplicate entries 

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