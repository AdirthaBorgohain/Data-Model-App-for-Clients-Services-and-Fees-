angular.module('myApp.models.projects', [

])
    .service('ProjectsModel', function () {
        var d = new Date;
        var model = this,
            data = [{ project_id: "abc", client_id: "PS1", project_name: "dummy", project_start_date: d, project_end_date: d, project_description: "dummy", other_project_details: "dummy" },
            { project_id: "xyz", client_id: "PS2", project_name: "service2", project_start_date: d, project_end_date: d, project_description: "dummy", other_project_details: "dummy" }
            ];
        model.getProjects = function () {
            return data;
        }
    });