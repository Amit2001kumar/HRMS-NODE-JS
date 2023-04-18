const bigInt = require("big-integer");
var dbConn = require('./../../config/db.config');

//Leaves object create
var ApplyLeaves = function(leaves){
 this.company_id=leaves.company_id;
 this.emp_name=leaves.emp_name;
    this.employee_id     = leaves.employee_id;
    this.leave_type      = leaves.leave_type;
    this.email          = leaves.email;
    this.date_from          = leaves.date_from;
    this.date_to         = leaves.date_to;
    this.reporting_manager   = leaves.reporting_manager;
    this.reason_for_leave    = leaves.reason_for_leave;
    this.additional_email = leaves.additional_email;
    this.poc_employee = leaves.poc_employee;
    this.poc_mobile = leaves.poc_mobile;
    this.poc_email = leaves.poc_email;
    this.Action = leaves.Action;
    this.describe_reason = leaves.describe_reason;
    this.Time_Added = new Date();
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
    dbConn.query("SELECT DATEDIFF(date_to, date_from) + 1 AS total_day FROM leaves order by Time_Added desc", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ApplyLeaves.findById_emp = function (employee_id,company_id, result) {
    dbConn.query("Select * from leaves where employee_id = ? AND company_id=? order by Time_Added desc",[employee_id,company_id], function (err, res) {             
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
    dbConn.query("Select * from leaves where ApplyLeaveId = ? order by Time_Added desc", ApplyLeaveId, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

ApplyLeaves.findAll = function (company_id,result) {
    dbConn.query("Select * from leaves where company_id=? order by Time_Added DESC",company_id, function (err, res) {
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

ApplyLeaves.update = function(ApplyLeaveId, leave, result){
   // const idint = bigInt(id).value;
  dbConn.query("UPDATE leaves SET leave_type=?,email=?,date_from=?,date_to=?,reporting_manager=?,reason_for_leave=?, additional_email=?, Action=?, describe_reason=? WHERE ApplyLeaveId =?",
  [leave.leave_type,leave.email,leave.date_from,leave.date_to,leave.reporting_manager,leave.reason_for_leave, leave.additional_email, leave.Action, leave.describe_reason, ApplyLeaveId], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

ApplyLeaves.delete = function(ApplyLeaveId, result){
     dbConn.query("DELETE FROM leaves WHERE ApplyLeaveId = ?", ApplyLeaveId, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

ApplyLeaves.updateBY = (body,employee_id,ApplyLeaveId) => {
    console.log("2",body,employee_id,ApplyLeaveId);
    const SQLQuery = `UPDATE leaves 
                        SET Action='${body.Action}' 
                        WHERE employee_id=${employee_id} and ApplyLeaveId=${ApplyLeaveId}`;

    return  dbConn.query(SQLQuery);
}

ApplyLeaves.findBy = function (employee_id,Action, result) {
    console.log("hii.....",employee_id,Action);
    dbConn.query("Select * from leaves where employee_id=? and Action=? ORDER BY Time_Added DESC",[employee_id, Action], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

ApplyLeaves.findAllByAction = function (Action, result) {
    dbConn.query("Select * from leaves where Action=? ORDER BY Time_Added DESC", Action, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

ApplyLeaves.findBySearch = function (leave_type,result) {
    dbConn.query("Select * from leaves where leave_type = ? ", leave_type, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

ApplyLeaves.findBySearchID = function (leave_type,employee_id,result) {
    dbConn.query("Select * from leaves where leave_type = ? and employee_id=?", [leave_type,employee_id], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};



ApplyLeaves.applyfindAllSearch = function (details,result) {
   
    // console.log(employee_id,leave_type)
    let leave_type = details.leave_type;
let employee_id = details.employee_id;
    dbConn.query("Select * from leaves where employee_id=? or leave_type=? ",[employee_id,leave_type], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
           
            result(null, res);
            console.log(res)
        }
    });   
  };

ApplyLeaves.applySearchAll = function (leave_type,result) {
   
    // console.log(employee_id,leave_type)

    dbConn.query("Select * from leaves",leave_type, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
           
            result(null, res);
            console.log(res)
        }
    });   
  };


module.exports= ApplyLeaves;
