const bigInt = require("big-integer");
var dbConn = require('./../../config/db.config');

//Announcements object create
var Announcements = function(Announ){
   
    this.Employee_id      = Announ.Employee_id;
    this.company_id          = Announ.company_id;
    this.Meeting          = Announ.Meeting;
    this.Date         = Announ.Date;  
};
Announcements.create = function (Announ, result) {    
    dbConn.query("INSERT INTO Announcements set ?", Announ, function (err, res) {
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

Announcements.findById = function (Announcementsid, result) {
    dbConn.query("Select * from Announcements where Announcementsid = ? ", Announcementsid, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Announcements.findAll = function (company_id,result) {
    dbConn.query("Select * from Announcements where company_id=?",company_id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('Announcements : ', res);  
            result(null, res);
        }
    });   
};

Announcements.update = function(Announcementsid, leave, result){
   // const idint = bigInt(id).value;
  dbConn.query("UPDATE Announcements SET employee_id=?,leave_type=?,email=?,date_from=?,date_to=?,reporting_manager=?,reason_for_leave=?, additional_email=?, WHERE Announcementsid =?",
  [leave.employee_id,leave.leave_type,leave.email,leave.date_from,leave.date_to,leave.reporting_manager,leave.reason_for_leave, leave.additional_email,Announcementsid], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

Announcements.delete = function(Announcementsid, result){
     dbConn.query("DELETE FROM Announcements WHERE Announcementsid = ?", [Announcementsid], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Announcements;
