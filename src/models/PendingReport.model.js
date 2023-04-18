const bigInt = require("big-integer");
var dbConn = require('./../../config/db.config');

//Leaves object create
var PendingReport = function(Report){
    // this.PendingReportID = Report.PendingReportID,
    // this.CompanyID = Report.CompanyID,
    this.EmployeeId =Report.EmployeeId,
    this.LeaveType =Report.LeaveType,
    this.DateFromandTo =Report.DateFromandTo,
    this.ReportingManager = Report.ReportingManager,
    this.Reasonforleave = Report.Reasonforleave,
    this.Action =Report.Action
    
};
PendingReport.create = function (newLeaves, result) {    
    dbConn.query("INSERT INTO tbl_pending_report set ?", newLeaves, function (err, res) {
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

PendingReport.findByAction = function (Action, result) {
    dbConn.query("Select * from tbl_pending_report where Action = ? ", Action, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

PendingReport.findAll = function (result) {
    dbConn.query("Select * from tbl_pending_report", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tbl_pending_report : ', res);  
            result(null, res);
        }
    });   
};

PendingReport.update = function(PendingReportID  , leave, result){
   // const idint = bigInt(id).value;
  dbConn.query("UPDATE tbl_pending_report SET Action=? WHERE PendingReportID   =?",
  [leave.Action,PendingReportID   ], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};











PendingReport.multipleupdatebyid = function(PendingReportID  , leave, result){
    // const idint = bigInt(id).value;
   dbConn.query("UPDATE tbl_pending_report SET EmployeeId=?,LeaveType=?,DateFromandTo=?,ReportingManager=?,Reasonforleave=?,Action=? WHERE PendingReportID   =?",
   [leave.EmployeeId,leave.LeaveType,leave.DateFromandTo,leave.ReportingManager,leave.Reasonforleave,leave.Action,PendingReportID   ], function (err, res) {
         if(err) {
             console.log("error: ", err);
             result(null, err);
         }else{   
             result(null, res);
         }
     }); 
 };




















PendingReport.delete = function(PendingReportID , result){
     dbConn.query("DELETE FROM tbl_pending_report WHERE PendingReportID  = ?", [PendingReportID ], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};



//working
PendingReport.updateById = function(EmployeeId  , leave, result){

  dbConn.query("UPDATE tbl_pending_report SET Action=? WHERE EmployeeId=?",
  [leave.Action,EmployeeId], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res.message);
        }
    }); 
};


module.exports= PendingReport;
