var dbConn = require('../../config/db.config');

birthday = function (result) {
    dbConn.query("SELECT name,birthday FROM hrms.tbl_birthdaywish WHERE birthday>=Date(NOW()) ORDER BY birthday ASC LIMIT 3", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('Birthday ! ', res);
            result(null, res);
        }
    });
};


leaves = function (result) {
    dbConn.query("Select * from leaves", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('Leaves : ', res);
            result(null, res);
        }
    });
};

newHire = function (result) {
    dbConn.query("SELECT * FROM (SELECT * FROM tbl_new_hire ORDER BY joiningDate DESC LIMIT 3) Var1 ORDER BY Employee_id ASC ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('newHire : ', res);
            result(null, res);
        }
    });
};



approvalForRequests = function (EmployeeId, result) {
    dbConn.query("SELECT * FROM tbl_applyleave where EmployeeId=?;", EmployeeId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('ApprovalRequest : ', res);
            result(null, res);
        }
    });
};


upcomingHolidays = function (result) {
    dbConn.query("SELECT Name,Date FROM add_holidays WHERE Date>=Date(NOW()) ORDER BY Date DESC LIMIT 3", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('add holidays : ', res);
            result(null, res);
        }
    });
};

module.exports = {

    birthday,
    leaves,
    newHire,
    approvalForRequests,
    upcomingHolidays
    
}
