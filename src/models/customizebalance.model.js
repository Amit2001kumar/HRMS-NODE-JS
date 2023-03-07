var dbConn = require('./../../config/db.config');

//balance object create
var customizebalance = function(balance){
    this.CompanyID = balance.CompanyID;
    this.employeeId = balance.employeeId;
    this.Employee = balance.Employee;
    this.leavetype = balance.leavetype;
    this.date = balance.date;
    this.existingbalance = balance.existingbalance;
    this.newbalance = balance.newbalance;
    this.reason = balance.reason;
    this.paternityleave = balance.paternityleave;
    this.createdDate     = new Date();
  
    
};
customizebalance.create = function (newbalance, result) {    
    dbConn.query("INSERT INTO tbl_customizebalance set ?", newbalance, function (err, res) {
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

customizebalance.findById = function (CustomizeBalanceID, result) {
    dbConn.query("Select * from tbl_customizebalance where CustomizeBalanceID = ? ", CustomizeBalanceID, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

customizebalance.findAll = function (result) {
    dbConn.query("Select * from tbl_customizebalance", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('balance : ', res);  
            result(null, res);
        }
    });   
};

customizebalance.update = function(CustomizeBalanceID, balance, result){
 
  dbConn.query("UPDATE tbl_customizebalance SET CompanyID=?,Employee=?,employeeId=?,leavetype=?,date=?,existingbalance=?,newbalance=?,reason=?,paternityleave=? WHERE CustomizeBalanceID =?",
  [balance.CompanyID,balance.Employee,balance.employeeId,balance.leavetype,balance.date,balance.existingbalance,balance.newbalance,balance.reason,balance.paternityleave,CustomizeBalanceID], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

customizebalance.delete = function(CustomizeBalanceID, result){
     dbConn.query("DELETE FROM tbl_customizebalance WHERE CustomizeBalanceID = ?", [CustomizeBalanceID], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= customizebalance;



