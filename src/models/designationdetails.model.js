var dbConn = require('./../../config/db.config');

var designationdetails = function(details){
    this.DesignationName     = details.DesignationName;
    this.MailAlias      = details.MailAlias;
    this.createdDate     = new Date();
    
};
designationdetails.create = function (newdetails, result) {    
    dbConn.query("INSERT INTO tbl_designationdetails set ?", newdetails, function (err, res) {
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

designationdetails.findById = function (DesignationDetailsID, result) {
    dbConn.query("Select * from tbl_designationdetails where DesignationDetailsID = ? ", DesignationDetailsID, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

designationdetails.findAll = function (result) {
    dbConn.query("Select * from tbl_designationdetails", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('details : ', res);  
            result(null, res);
        }
    });   
};

designationdetails.update = function(DesignationDetailsID, detail, result){
   // const idint = bigInt(id).value;
  dbConn.query("UPDATE tbl_designationdetails SET DesignationName=?,MailAlias=?, WHERE DesignationDetailsID =?",
  [detail.DesignationName,detail.MailAlias,DesignationDetailsID], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

designationdetails.delete = function(DesignationDetailsID, result){
     dbConn.query("DELETE FROM tbl_designationdetails WHERE DesignationDetailsID = ?", [DesignationDetailsID], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= designationdetails;



// const dbPool = require('../../config/db.config');

// const getAllUsers = () => {
//     const SQLQuery = 'SELECT * FROM tbl_designationdetails';

//     return dbPool.execute(SQLQuery);
// }


// const getbyid = (DesignationDetailsID) => {

//     const SQLQuery = `select * from tbl_designationdetails where DesignationDetailsID = ${DesignationDetailsID}`;

//     return dbPool.execute(SQLQuery);
// }


// const createNewUser = (body) => {
//     const SQLQuery = `INSERT INTO tbl_designationdetails
//     (CompanyID,DesignationName,MailAlias)
//                         VALUES ('${body.CompanyID}','${body.DesignationName}','${body.MailAlias}')`;

//     return dbPool.execute(SQLQuery);
// }


// module.exports = {
//     getAllUsers,
//     createNewUser,
//     getbyid
// }