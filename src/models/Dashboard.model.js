var dbConn = require('../../config/db.config');

birthday = function (company_id,result) {
//     SELECT * FROM hrms.tbl_birthdaywish WHERE birthday>=Date(NOW()) ORDER BY birthday ASC LIMIT 3  //upcoming
    
    dbConn.query("SELECT * FROM employees WHERE MONTH(Date_of_Birth) = MONTH(NOW()) AND DAY(Date_of_Birth) = DAY(NOW()) AND employee_status='Active' AND company_id=?",company_id, function (err, res) {   //current
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


leaves = function (company_id,result) {
    dbConn.query("Select * from leaves WHERE company_id=?",company_id, function (err, res) {
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
    dbConn.query("call GetNewHireDetails()", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
//             console.log('newHire : ', res);
            result(null, res[0]);
        }
    });
};



approvalForRequests = function (EmployeeId,company_id, result) {
    dbConn.query("SELECT * FROM tbl_applyleave where EmployeeId=? AND company_id=?",[EmployeeId,company_id], function (err, res) {
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


upcomingHolidays = function (company_id,result) {
    dbConn.query("SELECT Name,Date FROM add_holidays WHERE Date>=Date(NOW()) AND company_id=? ORDER BY Date ASC LIMIT 3",company_id, function (err, res) {
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
