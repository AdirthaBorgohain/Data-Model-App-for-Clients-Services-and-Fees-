angular.module('myApp.models.projects', [

])
    .service('ProjectsModel', function () {
        var d = new Date;
        var model = this,
            data = [{ project_id: "dummy", client_id: "PS1", project_name: "pname1", project_start_date: d, project_end_date: d, project_description: "dummy", other_project_details: "dummy" },
            { project_id: "dummy2", client_id: "PS2", project_name: "pname2", project_start_date: d, project_end_date: d, project_description: "dummy", other_project_details: "dummy" }
            ];
        model.getProjects = function () {
            return data;
        }
    });