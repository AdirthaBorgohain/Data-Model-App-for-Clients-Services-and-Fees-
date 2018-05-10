angular.module('dbApp', [])

    .controller('MainCtrl', function ($scope) {
        $scope.categories = [
            { "id": 0, "name": "Services" },
            { "id": 1, "name": "Projects" },
            { "id": 2, "name": "Clients" },
            { "id": 3, "name": "Staff" }
        ];

        $scope.attributes = [
            { "id": 0, "title": "service_code", "url": "http://angularjs.org", "category": "Services" },
            { "id": 1, "title": "parent_service_code", "url": "http://egghead.io", "category": "Services" },
            { "id": 2, "title": "service_name", "url": "http://alistapart.com/", "category": "Services" },
            { "id": 3, "title": "project_id", "url": "http://onepagelove.com/", "category": "Projects" },
            { "id": 4, "title": "client_id", "url": "http://www.mobilitywod.com/", "category": "Projects" },
            { "id": 5, "title": "project_name", "url": "http://robbwolf.com/", "category": "Projects" },
            { "id": 6, "title": "project_start_date", "url": "http://memebase.cheezburger.com/senorgif", "category": "Projects" },
            { "id": 7, "title": "project_end_date", "url": "http://wimp.com", "category": "Projects" },
            { "id": 8, "title": "project_description", "url": "http://dump.com", "category": "Projects" },
            { "id": 9, "title": "other_project_details", "url": "http://dump.com", "category": "Projects" },
            { "id": 10, "title": "currency_code", "url": "http://dump.com", "category": "Clients" },
            { "id": 11, "title": "client_name", "url": "http://dump.com", "category": "Clients" },
            { "id": 12, "title": "client_from_date", "url": "http://dump.com", "category": "Clients" },
            { "id": 13, "title": "kpi_avg_billable_rate", "url": "http://dump.com", "category": "Clients" },
            { "id": 14, "title": "kpi_billing_to_date", "url": "http://dump.com", "category": "Clients" },
            { "id": 15, "title": "kpi_client_project_count", "url": "http://dump.com", "category": "Clients" },
            { "id": 16, "title": "other_client_details", "url": "http://dump.com", "category": "Clients" },
            { "id": 17, "title": "other_project_details", "url": "http://dump.com", "category": "Clients" },
            { "id": 18, "title": "staff_id", "url": "http://dump.com", "category": "Staff" },
            { "id": 19, "title": "staff_name", "url": "http://dump.com", "category": "Staff" },
            { "id": 20, "title": "gender_MF", "url": "http://dump.com", "category": "Staff" },
            { "id": 21, "title": "date_of_birth", "url": "http://dump.com", "category": "Staff" },
            { "id": 22, "title": "daily_cost", "url": "http://dump.com", "category": "Staff" },
            { "id": 23, "title": "daily_rate", "url": "http://dump.com", "category": "Staff" },
            { "id": 24, "title": "date_joined", "url": "http://dump.com", "category": "Staff" },
            { "id": 25, "title": "date_left", "url": "http://dump.com", "category": "Staff" },
            { "id": 26, "title": "other_staff_details", "url": "http://dump.com", "category": "Staff" },
        ];

        $scope.currentCategory = null;

        function setCurrentCategory(category){
            $scope.currentCategory = category;
            
            cancelCreating();
            cancelEditing();
        }

        function isCurrentCategory(category){
            return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
        }

        $scope.setCurrentCategory = setCurrentCategory;

      //-------------------------------------------------------------------------------------------------
      // CREATING AND EDITING STATES
      //-------------------------------------------------------------------------------------------------
      function shouldShowCreating() {
        return $scope.currentCategory && !$scope.isEditing;
    }

    function startCreating() {
        $scope.isCreating = true;
        $scope.isEditing = false;
    }

    function cancelCreating() {
        $scope.isCreating = false;
    }

    $scope.shouldShowCreating = shouldShowCreating;
    $scope.startCreating = startCreating;
    $scope.cancelCreating = cancelCreating;

    function shouldShowEditing() {
        return $scope.isEditing && !$scope.isCreating;
    }

    function startEditing() {
        $scope.isCreating = false;
        $scope.isEditing = true;
    }

    function cancelEditing() {
        $scope.isEditing = false;
        $scope.editedBookmark = null;
    }

    $scope.startEditing = startEditing;
    $scope.cancelEditing = cancelEditing;
    $scope.shouldShowEditing = shouldShowEditing;
    })
    