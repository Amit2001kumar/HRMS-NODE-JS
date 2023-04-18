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
    // this.createdDate = new Date();
    this.added_by=schedule.added_by
       this.modified_by=schedule.modified_by
//   this.modified_by=schedule.modified_by

};


// AddSchedule.create = function (newSchedule, result) {
//     dbConn.query("INSERT INTO addschedule set ?", newSchedule, function (err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else {
//             console.log(res.insertId);
//             result(null, res.insertId);
//         }
//     });
// };





AddSchedule.create = function (newSchedule, result) {    
         dbConn.query("Select * from addschedule where ScheduleName=? and LeaveID=? and Date=?",
    [newSchedule.ScheduleName,newSchedule.LeaveID,newSchedule.Date], function (err, res) {
             
        if(err || res.length > 0) {
            console.log("error: ", err);
            const msg = "already exist"
            result(err, msg);
           
        }
        else{
            dbConn.query("INSERT INTO addschedule set ?", newSchedule, 
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


AddSchedule.update = function(AddScheduleId, schedule, result){
    // const idint = bigInt(id).value;
    let m= new Date();
   dbConn.query("UPDATE addschedule SET ScheduleName=?,TimeofSchedule=?,LeaveType=?,LeaveID=?,Date=?,modified_by=?,modified_time=? WHERE AddScheduleId =?",
   [schedule.ScheduleName,schedule.TimeofSchedule,schedule.LeaveType,schedule.LeaveID,schedule.Date,schedule.modified_by,
    m,AddScheduleId], function (err, res) {
         if(err) {
             console.log("error: ", err);
             result(null, err);
         }else{   
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







AddSchedule.findBySearch = function (ScheduleName, result) {
    dbConn.query("Select * FROM addschedule where ScheduleName = ? ", ScheduleName, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

AddSchedule.findAllSearch = function (ScheduleName,result) {
    // console.log(AddScheduleId,Employee_Name)
    dbConn.query("Select * FROM addschedule",ScheduleName, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('ScheduleName : ', res);  
            result(null, res);
        }
    });   
  };



module.exports= AddSchedule;
