var dbConn = require('./../../config/db.config');

//Employee object create
var Project = function (project) {
//     this.employee_id = project.employee_id;
    this.project_name = project.project_name;
    this.project_owner = project.project_owner;
    this.project_owner_email = project.project_owner_email;
    this.status = project.status;
    this.client_name = project.client_name;
    this.client_poc1 = project.client_poc1;
    this.client_poc2 = project.client_poc2;
    this.cliente_email_id = project.cliente_email_id;
    this.created_at = new Date();
    this.updated_at = new Date();
};


Project.create = function (newProject, repository, result) {
    let repositoryValues = [];


    for (let i = 0; i < repository.length; i++) {
        repositoryValues.push([
            newProject.project_name,
            repository[i].repository_type,
            repository[i].new_repository,
            repository[i].remark,
        ])
    }

    console.log(repositoryValues);

    dbConn.query("INSERT INTO projects set ?", newProject,
        function (err, res) {
            if (err)
                throw err;
            console.log("Project of records inserted: " + res.affectedRows);

            dbConn.query("INSERT INTO repository(project_name,repository_type,new_repository,remark) VALUES ?", [repositoryValues],
                function (err, res) {
                    if (err) throw err;
                    console.log("repository of records inserted: " + res.affectedRows);

                });
            result(null, res.insertId);
        });

};



Project.delete = function (project_name, result) {

    dbConn.query("DELETE FROM projects WHERE project_name = ?", [project_name],
        function (err, res) {
            if (err)
                throw err;

            dbConn.query("DELETE FROM repository WHERE project_name = ?", [project_name],
                function (err, res) {
                    if (err) throw err;
                    console.log("repository of records deleted: " + res.affectedRows);

                });

            result(null, res);
        });

};



// Project.update = function (id, project, result) {
//     dbConn.query
//         ("UPDATE projects SET project_name=?,project_owner=?,project_owner_email=?,status=?,client_name=?,client_poc1=?,client_poc2=?, cliente_email_id=? WHERE id= ?",
//             [project.project_name, project.project_owner, project.project_owner_email, project.status, project.client_name, project.client_poc1, project.client_poc2, project.cliente_email_id,id],
//             function (err, res) {
//                 if (err) {
//                     console.log("error: ", err);
//                     result(null, err);
//                 } else {
//                     result(null, res);
//                 }
//             });
// };



Project.update = function (project_name, project, repository, result) {
    let repositoryValues = [];

    for (let i = 0; i < repository.length; i++) {
        repositoryValues.push([
            // newProject.employee_id,
            repository[i].repository_type,
            repository[i].new_repository,
            repository[i].remark,
        ])
    }

    dbConn.query("UPDATE projects SET project_name=?,project_owner=?,project_owner_email=?,status=?,client_name=?,client_poc1=?,client_poc2=?, cliente_email_id=? WHERE project_name= ?", [project.project_name, project.project_owner, project.project_owner_email, project.status, project.client_name, project.client_poc1, project.client_poc2, project.cliente_email_id, project_name],
        function (err, res) {
            if (err)
                throw err;
            console.log("project of records updated: " + res.affectedRows);

            for (let i = 0; i < repository.length; i++) {
                dbConn.query("UPDATE repository SET repository_type=?, new_repository=?, remark=? where project_name=?", [repository[i].repository_type, repository[i].new_repository, repository[i].remark, project_name],
                    function (err, res) {
                        if (err) throw err;
                        console.log("repository of records inserted: " + res.affectedRows);
                    });
            }

            // console.log("check")
            result(null, res.insertId);
        });

};


Project.findAll = function (result) {
    dbConn.query("Select * from projects", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('project : ', res);
            result(null, res);
        }
    });
};


Project.findBySearch = function (params, result) {
    let project_name = params.project_name;
    let project_owner = params.project_owner;
    let status = params.status;
    var sql = 'SELECT * FROM projects WHERE project_name = ? AND project_owner = ? AND status = ?';
    dbConn.query(sql, [project_name, project_owner, status], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Project.findByMultiSearch = function (params, result) {
    let project = params.project;
    let project_owner = params.project_owner;
    let status = params.status;
    var sql = 'SELECT * FROM project WHERE project = ? OR project_owner = ? OR status = ? ';
    dbConn.query(sql, [project, project_owner, status], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

// Project.findById = function (id, result) {
//     dbConn.query("Select * from projects where id = ? ", id, 
    
//     function (err, res) {             
//         if(err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else{
//             result(null, res);
//         }
//     });   
// };


Project.findById = function (project_name, result) {
    dbConn.query("SELECT * FROM projects inner join repository on projects.project_name = repository.project_name where projects.project_name = ? ", project_name, 
    
    function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};



// Project.findAll = function (result) {

//     dbConn.query("Select * from projects",
//         function (err, res) {
//             if (err)
//                 throw err;

//             dbConn.query("Select * from repository",
//                 function (err, res) {
//                     if (err) throw err;
//                     // console.log("repository of records deleted: " + res.affectedRows);

//                 });
//             result(null, res);
//         });
// };


module.exports = Project;
