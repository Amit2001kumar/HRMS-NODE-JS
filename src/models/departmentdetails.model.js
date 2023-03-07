const bigInt = require("big-integer");
var dbConn = require('./../../config/db.config');



//details object create
var departmentdetails = function(details){

    this.departmentName =  details.departmentName
    this.MailAlias = details.MailAlias
    this.DepartmentLead =  details.DepartmentLead
    this.ParentDepartment = details.ParentDepartment
//    this.employee_id      = designation.employee_id;
//     this.company_id          = designation.company_id;
//     this.added_by   = designation.added_by;
//     this.modified_by    = designation.modified_by;
    this.status         = details.status ? details.status : 1;
    this.added_time     = new Date();
    this.modified_time     = new Date();
    
    
};
departmentdetails.create = function (details, result) {  
    dbConn.query("Select * from department where departmentName=? and MailAlias=?",
    [details.departmentName,details.MailAlias], function (err, res) {
        if(err || res.length > 0) {
            console.log("error: ", err);
            const msg = "already exist"
            result(err, msg);
           
        }
        else{
            dbConn.query("INSERT INTO department set ?", details, 
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

departmentdetails.findById = function (departmentId, result) {
    dbConn.query("Select * from department where departmentId = ? ", departmentId, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

departmentdetails.findAll = function (result) {
    dbConn.query("Select * from department", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('department : ', res);  
            result(null, res);
        }
    });   
};

departmentdetails.update = function(departmentId, details, result){
   // const idint = bigInt(id).value;
  dbConn.query("UPDATE department SET departmentName=?,MailAlias=?,DepartmentLead=?,ParentDepartment=?,modified_time=? WHERE departmentId =?",
  [details.departmentName,details.MailAlias,details.DepartmentLead,details.ParentDepartment,details.modified_time,departmentId], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

departmentdetails.delete = function(departmentId, result){
     dbConn.query("DELETE FROM department WHERE departmentId = ?", [departmentId], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= departmentdetails;
