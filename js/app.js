var app = angular.module('myApp', []);


app.controller("ServiceController",['$scope',function($scope){

   $scope.data = [{ serviceCode:"abc",parent_service_code:"PS1",service_name:"dummy" },
				  { serviceCode:"xyz",parent_service_code:"PS2",service_name:"service2" } 
				];

	$scope.services = angular.copy( $scope.data);
	$scope.enabledEdit =[];
	$scope.subEnable = false;
	var currIndex;

    $scope.addService = function(){
		$scope.subEnable = true;
	    var emp ={ serviceCode:"",parent_service_code:"",service_name:"",disableEdit:false};
		$scope.services.push(emp);
		$scope.enabledEdit[$scope.services.length-1]=true;
		currIndex = $scope.services.length-1;
	}
	$scope.editService = function(index){
		console.log("edit index"+index);
		$scope.subEnable = true;
		$scope.enabledEdit[index] = true;
		currIndex = index;
	}
	$scope.deleteService = function(index) {
		  $scope.services.splice(index,1);
		  currIndex = index-1;
		  $scope.subEnable = false;
	}
	
	$scope.submitService = function(){
		$scope.subEnable = false;
		$scope.enabledEdit[currIndex] = false;
		console.log("submitService called");
		console.log("form submitted:"+angular.toJson($scope.services ));
	}

	$scope.checkSub = function(){
		return($scope.subEnable);
	}
	
}]);

app.controller("ProjectController",['$scope',function($scope){

	$scope.data = [{ project_id:"abc",client_id:"PS1",project_name:"dummy",project_start_date:"dummy",project_end_date:"dummy",project_description:"dummy",other_project_details:"dummy" },
				   { project_id:"xyz",client_id:"PS2",project_name:"service2",project_start_date:"dummy",project_end_date:"dummy",project_description:"dummy",other_project_details:"dummy" } 
				 ];
 
	 $scope.projects = angular.copy( $scope.data );
	 $scope.enabledEdit =[];
	 $scope.subEnable = false;
	 var currIndex;
 
	 $scope.addProject = function(){
		 $scope.subEnable = true;
		 var emp ={ project_id:"",client_id:"",project_name:"",project_start_date:"",project_end_date:"",project_description:"",other_project_details:"",disableEdit:false};
		 $scope.projects.push(emp);
		 $scope.enabledEdit[$scope.projects.length-1]=true;
		 currIndex = $scope.projects.length-1;
	 }
	 $scope.editProject = function(index){
		 console.log("edit index"+index);
		 $scope.subEnable = true;
		 $scope.enabledEdit[index] = true;
		 currIndex = index;
	 }
	 $scope.deleteProject = function(index) {
		   $scope.projects.splice(index,1);
		   currIndex = index-1;
		   $scope.subEnable = false;
	 }
	 
	 $scope.submitProject = function(){
		 $scope.subEnable = false;
		 $scope.enabledEdit[currIndex] = false;
		 console.log("submitProject called");
		 console.log("form submitted:"+angular.toJson($scope.projects ));
	 }
 
	 $scope.checkSub = function(){
		 return($scope.subEnable);
	 }
	 
 }]);

app.controller("ClientController",['$scope',function($scope){

	$scope.data = [{ currency_code:"abc",client_name:"PS1",client_from_date:"dummy",kpi_avg_billable_rate:"dummy",kpi_billing_to_date:"dummy",kpi_client_project_count:"dummy",other_client_details:"dummy" },
				   { currency_code:"xyz",client_name:"PS2",client_from_date:"service2",kpi_avg_billable_rate:"dummy",kpi_billing_to_date:"dummy",kpi_client_project_count:"dummy",other_client_details:"dummy" } 
				 ];
 
	 $scope.clients = angular.copy( $scope.data );
	 $scope.enabledEdit =[];
	 $scope.subEnable = false;
	 var currIndex;
 
	 $scope.addClient = function(){
		 $scope.subEnable = true;
		 var emp ={ currency_code:"",client_name:"",client_from_date:"",kpi_avg_billable_rate:"",kpi_billing_to_date:"",kpi_client_project_count:"",other_client_details:"",disableEdit:false};
		 $scope.clients.push(emp);
		 $scope.enabledEdit[$scope.clients.length-1]=true;
		 currIndex = $scope.clients.length-1;
	 }
	 $scope.editClient = function(index){
		 console.log("edit index"+index);
		 $scope.subEnable = true;
		 $scope.enabledEdit[index] = true;
		 currIndex = index;
	 }
	 $scope.deleteClient = function(index) {
		   $scope.clients.splice(index,1);
		   currIndex = index-1;
		   $scope.subEnable = false;
	 }
	 
	 $scope.submitClient = function(){
		 $scope.subEnable = false;
		 $scope.enabledEdit[currIndex] = false;
		 console.log("submitClient called");
		 console.log("form submitted:"+angular.toJson($scope.clients ));
	 }
 
	 $scope.checkSub = function(){
		 return($scope.subEnable);
	 }
	 
 }]);

 app.controller("StaffController",['$scope',function($scope){

	$scope.data = [{ staff_id:"abc",staff_name:"PS1",gender_MF:"dummy",date_of_birth:"dummy",daily_cost:"dummy",daily_rate:"dummy",date_joined:"dummy",date_left:"dummy",other_staff_details:"dummy" },
				   { staff_id:"xyz",staff_name:"PS2",gender_MF:"service2",date_of_birth:"dummy",daily_cost:"dummy",daily_rate:"dummy",date_joined:"dummy",date_left:"dummy",other_staff_details:"dummy" } 
				 ];
 
	 $scope.staffs = angular.copy( $scope.data );
	 $scope.enabledEdit =[];
	 $scope.subEnable = false;
	 var currIndex;
 
	 $scope.addStaff = function(){
		 $scope.subEnable = true;
		 var emp ={ staff_id:"",staff_name:"",gender_MF:"",date_of_birth:"",daily_cost:"",daily_rate:"",date_joined:"",date_left:"dummy",other_staff_details:"dummy",disableEdit:false};
		 $scope.staffs.push(emp);
		 $scope.enabledEdit[$scope.staffs.length-1]=true;
		 currIndex = $scope.staffs.length-1;
	 }
	 $scope.editStaff = function(index){
		 console.log("edit index"+index);
		 $scope.subEnable = true;
		 $scope.enabledEdit[index] = true;
		 currIndex = index;
	 }
	 $scope.deleteStaff = function(index) {
		   $scope.staffs.splice(index,1);
		   currIndex = index-1;
		   $scope.subEnable = false;
	 }
	 
	 $scope.submitStaff = function(){
		 $scope.subEnable = false;
		 $scope.enabledEdit[currIndex] = false;
		 console.log("submitStaff called");
		 console.log("form submitted:"+angular.toJson($scope.staffs ));
	 }
 
	 $scope.checkSub = function(){
		 return($scope.subEnable);
	 }
	 
 }]);