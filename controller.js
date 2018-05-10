angular.module('MyApp.controllers',[])
.controller('ServiceController',['$scope',function($scope){
    $scope.service = {
        service_code: '1',
        parent_service_code: '10',
        service_name: 'Test'
    };
}]);