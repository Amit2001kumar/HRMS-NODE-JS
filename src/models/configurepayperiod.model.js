var dbConn = require('./../../config/db.config');

//period object create
var configurepayperiod = function(period){
    this.PeriodName     = period.PeriodName;
    this.PayPeriodCycle      = period.PayPeriodCycle;
    this.createdDate     = new Date();   
    
};

configurepayperiod.create = function (newperiod, result) {    
    dbConn.query("INSERT INTO tbl_configurepayperiod set ?", newperiod, function (err, res) {
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

configurepayperiod.findById = function (ConfigurePayPeriodID, result) {
    dbConn.query("Select * from tbl_configurepayperiod where ConfigurePayPeriodID = ? ", ConfigurePayPeriodID, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

configurepayperiod.findAll = function (result) {
    dbConn.query("Select * from tbl_configurepayperiod", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('period : ', res);  
            result(null, res);
        }
    });   
};

configurepayperiod.update = function(ConfigurePayPeriodID, period, result){
   // const idint = bigInt(id).value;
  dbConn.query("UPDATE tbl_configurepayperiod SET PeriodName=?,PayPeriodCycle=?, WHERE ConfigurePayPeriodID =?",
  [period.PeriodName,period.PayPeriodCycle,ConfigurePayPeriodID], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

configurepayperiod.delete = function(ConfigurePayPeriodID, result){
     dbConn.query("DELETE FROM tbl_configurepayperiod WHERE ConfigurePayPeriodID = ?", [ConfigurePayPeriodID], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= configurepayperiod;



// const dbPool = require('../../config/db.config');

// const getAllUsers = () => {
//     const SQLQuery = 'SELECT * FROM tbl_configurepayperiod';

//     return dbPool.execute(SQLQuery);
// }

// const getbyid = (ConfigurePayPeriodID) => {

//     const SQLQuery = `select * from tbl_configurepayperiod where ConfigurePayPeriodID = ${ConfigurePayPeriodID}`;

//     return dbPool.execute(SQLQuery);
// }


// const createNewUser = (body) => {
//   //  const timestamp = new Date();
//     const SQLQuery = `INSERT INTO tbl_configurepayperiod
//     (CompanyID,PeriodName,PayPeriodCycle)
//                         VALUES ('${body.CompanyID}','${body.PeriodName}','${body.PayPeriodCycle}')`;

//     return dbPool.execute(SQLQuery);
// }


// module.exports = {
//     getAllUsers,
//     createNewUser,
//     getbyid,
// }