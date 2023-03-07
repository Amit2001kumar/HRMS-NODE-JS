const bigInt = require("big-integer");
var dbConn = require('./../../config/db.config');

//Leaves object create
var ApplyLeaves = function(leaves){
    this.employee_id     = leaves.employee_id;
    this.leave_type      = leaves.leave_type;
    this.email          = leaves.email;
    this.date_from          = leaves.date_from;
    this.date_to         = leaves.date_to;
    this.reporting_manager   = leaves.reporting_manager;
    this.reason_for_leave    = leaves.reason_for_leave;
    this.additional_email = leaves.additional_email;
    this.Time_Added     = new Date();
   // this.updated_at     = new Date();
      
};


// ApplyLeaves.create = function (newLeaves, result) {    
//     dbConn.query("INSERT INTO leaves set ?", newLeaves, function (err, res) {
//         if(err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else{
//             console.log(res.insertId);
//             result(null, res.insertId);
//         }
//     });           
// };

ApplyLeaves.create = function (newLeaves, result) {  
    dbConn.query("Select * from leaves where date_from=? and date_to= ? and employee_id=?",
    [newLeaves.date_from,newLeaves.date_to, newLeaves.employee_id], function (err, res) {
        if(err || res.length > 0) {
            console.log("error: ", err);
            const msg = "already exist"
            result(err, msg);
           
        }
        else{
            dbConn.query("INSERT INTO leaves set ?", newLeaves, 
            function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res.insertId);
                    console.log(res.insertId);
                    
                }
            });  
        }
    }); 
     
};

ApplyLeaves.Totalleave = function (result) {
    dbConn.query("SELECT DATEDIFF(date_to, date_from) + 1 AS total_day FROM leaves",  function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

ApplyLeaves.findById = function (ApplyLeaveId, result) {
    dbConn.query("Select * from leaves where employee_id = ? ", ApplyLeaveId, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

ApplyLeaves.findAll = function (result) {
    dbConn.query("Select * from leaves", function (err, res) {
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

ApplyLeaves.update = function(employee_id, leave, result){
   // const idint = bigInt(id).value;
  dbConn.query("UPDATE leaves SET leave_type=?,email=?,date_from=?,date_to=?,reporting_manager=?,reason_for_leave=?, additional_email=? WHERE employee_id =?",
  [leave.leave_type,leave.email,leave.date_from,leave.date_to,leave.reporting_manager,leave.reason_for_leave, leave.additional_email,employee_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

ApplyLeaves.delete = function(employee_id, result){
     dbConn.query("DELETE FROM leaves WHERE employee_id = ?", [employee_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= ApplyLeaves;
