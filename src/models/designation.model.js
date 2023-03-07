'user strict';
var dbConn = require('./../../config/db.config');

Designation = function(designation){
    this.designation_name     = designation.designation_name;
    this.employee_id      = designation.employee_id;
    this.CompanyID          = designation.CompanyID;
    this.mail_alias          = designation.mail_alias;
//     this.added_by   = designation.added_by;
//     this.modified_by    = designation.modified_by;
    this.status         = designation.status ? designation.status : 1;
    this.added_time     = new Date();
    this.modified_time     = new Date();
};

Designation.create = function (designation, result) {  
    dbConn.query("Select * from designation where designation_name=? and mail_alias=? ",
    [designation.designation_name,designation.mail_alias], function (err, res) {
        if(err || res.length > 0) {
            console.log("error: ", err);
            const msg = "already exist"
            result(err, msg);
           
        }
        else{
            dbConn.query("INSERT INTO designation set ?", designation, 
            function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res.insertId);
                   
                    
                }
            });  
        }
    }); 
     
};
         
Designation.findById = function (id, result) {
    dbConn.query("Select * from designation where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Designation.findAll = function (result) {
    dbConn.query("Select * from designation", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('project : ', res);  
            result(null, res);
        }
    });   
};
Designation.update = function(id, designation, result){
  dbConn.query
  ("UPDATE designation SET designation_name=?,mail_alias=?,modified_time=? WHERE id = ?", 
  [designation.designation_name,designation.mail_alias,designation.modified_time,id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Designation.delete = function(id, result){
     dbConn.query("DELETE FROM designation WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Designation;
