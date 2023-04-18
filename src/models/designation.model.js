'user strict';
var dbConn = require('./../../config/db.config');

Designation = function(designation){
    this.designation_name     = designation.designation_name;
    this.employee_id      = designation.employee_id;
    this.company_id          = designation.company_id;
    this.mail_alias          = designation.mail_alias;
   
    this.modified_by    = designation.modified_by;
    this.status         = designation.status ? designation.status : 1;
     this.added_by=designation.added_by;
    this.added_time=new Date();
  
};

Designation.create = function (designation, result) {  
    dbConn.query("Select * from designation where designation_name=? and company_id=? ",
    [designation.designation_name,designation.company_id], function (err, res) {
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
Designation.findAll = function (company_id,result) {
    dbConn.query("Select * from designation where company_id=? order by added_time DESC ",company_id, function (err, res) {
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
     let d= new Date();
  dbConn.query
  ("UPDATE designation SET designation_name=?,mail_alias=?,modified_by=?,modified_time=? WHERE id = ?", 
  [designation.designation_name,designation.mail_alias,designation.modified_by,d,id], function (err, res) {
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

Designation.findBySearch = function (designation_name, result) {
    dbConn.query("Select * FROM designation where designation_name = ? ", designation_name, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Designation.findAllSearch = function (designation_name,result) {
    // console.log(Employee_id,Employee_Name)
    dbConn.query("Select * from designation",designation_name, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('designation : ', res);  
            result(null, res);
        }
    });   
  };


module.exports= Designation;
