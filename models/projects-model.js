angular.module('myApp.models.projects', [

])
    .service('ProjectsModel', function () {
        var d = new Date;
        var model = this,
            data = [{ project_id: "PID1", client_id: "CID1", project_name: "pname1", project_start_date: d, project_end_date: d, project_description: "pdesc1", other_project_details: "pdetails1" },
            { project_id: "PID2", client_id: "CID2", project_name: "pname2", project_start_date: d, project_end_date: d, project_description: "pdesc2", other_project_details: "pdetails2" }
            ];
        model.getProjects = function () {
            return data;
        }
    });