var dbConn = require('./../../config/db.config');

//Leaves object create
var Addleave = function(leaves){
    this.EmployeeId     = leaves.EmployeeId;
    this.LeaveType      = leaves.LeaveType;
    this.TeamEmail          = leaves.TeamEmail;
    this.DateFrom          = leaves.DateFrom;
    this.DateTo         = leaves.DateTo;
    this.ReasonForLeave   = leaves.ReasonForLeave;
    this.createdDate     = new Date();
 
    
};
Addleave.create = function (newLeaves, result) {    
    dbConn.query("INSERT INTO tbl_addleave set ?", newLeaves, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};

Addleave.findById = function (AddLeaveId, result) {
    dbConn.query("Select * from tbl_addleave where AddLeaveId = ? ", AddLeaveId, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Addleave.findAll = function (result) {
    dbConn.query("Select * from tbl_addleave", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('Leaves : ', res);  
            result(null, res);
        }
    });   
};

Addleave.update = function(AddLeaveId, leave, result){
   // const idint = bigInt(id).value;
  dbConn.query("UPDATE tbl_addleave SET EmployeeId=?,LeaveType=?,TeamEmail=?,DateFrom=?,DateTo=?,ReasonForLeave=? WHERE AddLeaveId =?",
  [leave.EmployeeId,leave.LeaveType,leave.TeamEmail,leave.DateFrom,leave.DateTo,leave.ReasonForLeave,AddLeaveId], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

Addleave.delete = function(AddLeaveId, result){
     dbConn.query("DELETE FROM tbl_addleave WHERE AddLeaveId = ?", [AddLeaveId], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Addleave;