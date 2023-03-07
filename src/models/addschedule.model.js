var dbConn = require('./../../config/db.config');

var AddSchedule = function (schedule) {
    this.ScheduleName = schedule.ScheduleName;
    this.TimeofSchedule = schedule.TimeofSchedule;
    this.LeaveType = schedule.LeaveType;
    this.LeaveID = schedule.LeaveID;
    this.Date = schedule.Date;
    this.User = schedule.User;
    this.Department = schedule.Department;
    this.Designation=schedule.Designation;
    this.Roles = schedule.Roles;
    this.Location = schedule.Location;
    this.Groups = schedule.Groups;
    this.createdDate = new Date();

};


AddSchedule.create = function (newSchedule, result) {
    dbConn.query("INSERT INTO addschedule set ?", newSchedule, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};


AddSchedule.findAll = function (result) {
    dbConn.query("SELECT * FROM hrms.addschedule;", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('Schedule : ', res);
            result(null, res);
        }
    });
};


AddSchedule.findById = function (AddScheduleId, result) {
    dbConn.query("Select * from addschedule where AddScheduleId = ? ", AddScheduleId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


AddSchedule.update = function (AddScheduleId, leave, result) {
    // const idint = bigInt(id).value;
    dbConn.query("UPDATE addschedule SET employee_id=?,leave_type=?,email=?,date_from=?,date_to=?,reporting_manager=?,reason_for_leave=?, additional_email=?, WHERE AddScheduleId =?",
        [leave.employee_id, leave.leave_type, leave.email, leave.date_from, leave.date_to, leave.reporting_manager, leave.reason_for_leave, leave.additional_email, AddScheduleId], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};


AddSchedule.delete = function(AddScheduleId, result){
    dbConn.query("DELETE FROM addschedule WHERE AddScheduleId = ?", AddScheduleId, function (err, res) {
       if(err) {
           console.log("error: ", err);
           result(null, err);
       }
       else{
           result(null, res);
       }
   }); 
};



module.exports= AddSchedule;
