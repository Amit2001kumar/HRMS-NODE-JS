var dbConn = require('./../../config/db.config');

//Leaves object create
var Addleave = function(leaves){
    this.Name     = leaves.Name;
    this.LeaveType      = leaves.LeaveType;
    this.NumberOfDays          = leaves.NumberOfDays;
    this.DateFrom          = leaves.DateFrom;
    this.DateTo         = leaves.DateTo;
    this.Description   = leaves.Description;
    this.LeaveDuration=leaves.LeaveDuration;
   
    this.createdBy=leaves.createdBy;
   this.modifiedBy=leaves.modifiedBy;
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

Addleave.findTotalLeave = function (result) {
    dbConn.query("Select sum(NumberOfDays) as TotalLeave from tbl_addleave", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('Leaves : ', res);  
            result(null, res[0]);
        }
    });   
};

Addleave.update = function(AddLeaveId, leave, result){
   // const idint = bigInt(id).value;
    let d=new Date();
  dbConn.query("UPDATE tbl_addleave SET Name=?,LeaveType=?,NumberOfDays=?,DateFrom=?,DateTo=?,Description=?,LeaveDuration=?,modifiedBy=?,modifiedDate=? WHERE AddLeaveId =?",
  [leave.Name,leave.LeaveType,leave.NumberOfDays,leave.DateFrom,leave.DateTo,leave.Description,leave.LeaveDuration,leave.modifiedBy,d,AddLeaveId], function (err, res) {
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
