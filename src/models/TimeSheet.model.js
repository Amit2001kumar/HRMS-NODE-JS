const bigInt = require("big-integer");
var dbConn = require('./../../config/db.config');

//TimeSheet object create
var TimeSheet = function (timedata) {
    
this.employeeId = timedata.employeeId;
    this.Clients = timedata.Clients;
    this.Project = timedata.Project;
    this.Date = timedata.Date;
    this.WorkingHours = timedata.WorkingHours;

    this.Task = timedata.Task;
    this.CompanyID = timedata.CompanyID;


};
TimeSheet.create = function (newTimeSheet, result) {
    dbConn.query("INSERT INTO tbl_timesheet set ?", newTimeSheet, function (err, res) {
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

TimeSheet.findById = function (TimeSheetId, result) {
    dbConn.query("Select * from tbl_timesheet where TimeSheetId = ? ", TimeSheetId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

TimeSheet.findAll = function (result) {
    dbConn.query("Select * from tbl_timesheet", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('timesheet : ', res);
            result(null, res);
        }
    });
};

TimeSheet.update = function (TimeSheetId, data, result) {
    // const idint = bigInt(id).value;
    dbConn.query("UPDATE tbl_timesheet SET Clients=?, Project=?, Date=?, WorkingHours=?, Task=?, CompanyID=? WHERE TimeSheetId =?",
        [data.Clients, data.Project, data.Date, data.WorkingHours, data.Task, data.CompanyID, TimeSheetId], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

TimeSheet.delete = function (TimeSheetId, result) {
    dbConn.query("DELETE FROM tbl_timesheet WHERE TimeSheetId = ?", [TimeSheetId], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};



TimeSheet.month = function (employeeId, result) {
    dbConn.query("select SEC_TO_TIME(sum(TIME_TO_SEC(WorkingHours))) AS TotalHours from tbl_timesheet where  MONTH(Date)= MONTH(curdate()) and  employeeId = ? ", employeeId, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

TimeSheet.findByEmpId = function (empID, result) {
    dbConn.query("Select * from tbl_timesheet where employeeId = ? ", empID, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


TimeSheet.findBySearch = function (params, result) {
    let Project = params.Project;
    let Clients = params.Clients;
    let Date = params.Date;
    var sql = 'SELECT * FROM tbl_timesheet WHERE Project = ? OR Clients = ? OR Date = ?';
    dbConn.query(sql, [Project, Clients, Date], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};



module.exports = TimeSheet;
