const bigInt = require("big-integer");
var dbConn = require('./../../config/db.config');



//details object create
var departmentdetails = function(details){

    this.departmentName =  details.departmentName
    this.MailAlias = details.MailAlias
    this.DepartmentLead =  details.DepartmentLead
    this.ParentDepartment = details.ParentDepartment
//    this.employee_id      = details.employee_id;
//     this.company_id          = details.company_id;
    this.added_by   = details.added_by;
    this.modified_by    = details.modified_by;
    this.status         = details.status ? details.status : 1;
    this.added_time     = new Date();

    this.company_id=details.company_id
    
};
departmentdetails.create = function (details, result) {  
    dbConn.query("Select * from department where departmentName=? and company_id=?",
    [details.departmentName,details.company_id], function (err, res) {
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

departmentdetails.findAll = function (company_id,result) {
    dbConn.query("Select * from department where company_id=?",company_id, function (err, res) {
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
     let d= new Date();
  dbConn.query("UPDATE department SET departmentName=?,MailAlias=?,DepartmentLead=?,ParentDepartment=?,modified_by=?,modified_time=? WHERE departmentId =?",
  [details.departmentName,details.MailAlias,details.DepartmentLead,details.ParentDepartment,details.modified_by,d,departmentId], function (err, res) {
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


departmentdetails.findBySearch = function (departmentName, result) {
    dbConn.query("Select * FROM department where departmentName = ? ", departmentName, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

departmentdetails.findAllSearch = function (departmentName,result) {
    // console.log(Employee_id,Employee_Name)
    dbConn.query("Select * from department",departmentName, function (err, res) {
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


module.exports= departmentdetails;
