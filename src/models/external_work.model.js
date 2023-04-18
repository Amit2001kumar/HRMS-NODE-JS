var dbConn = require('./../../config/db.config');
const bcrypt = require('bcryptjs');
var onboading = function(credentials){
    
    this.emp_id  = credentials.emp_id;
    this.emp_name  = credentials.emp_name;
    this.location  = credentials.location;
    this.roll_id  = credentials.roll_id;
    this.designation  = credentials.designation;
    this.joining_date   = credentials.joining_date;
   this.company_id=credentials.company_id;
    
    this.company_email_id   = credentials.company_email_id;
    this.password   = credentials.password;
    this.confirm_password   = credentials.confirm_password;
      
}; 
 
onboading.delete = function(id, result){
    dbConn.query("DELETE FROM onboarding_credentials WHERE id = ?", [id], function (err, res) {
       if(err) {
           console.log("error: ", err);
           result(null, err);
       }
       else{
           result(null, res);
       }
   }); 
};


onboading.update = function(id, credentials, result){
    // const idint = bigInt(id).value;
   dbConn.query("UPDATE onboarding_credentials SET emp_name=?,company_email_id=? WHERE id =?",
   [credentials.emp_name,credentials.company_email_id,id], function (err, res) {
         if(err) {
             console.log("error: ", err);
             result(null, err);
         }else{   
             result(null, res);
         }
     }); 
 };


onboading.getbyid = function(id, result){
    dbConn.query("SELECT * FROM onboarding_credentials WHERE id = ?", [id], function (err, res) {
       if(err) {
           console.log("error: ", err);
           result(null, err);
       }
       else{
           result(null, res);
       }
   }); 
};
       

onboading.getbycmpnyid = function(company_id, result){
    dbConn.query("SELECT * FROM onboarding_credentials WHERE company_id = ?", company_id, function (err, res) {
       if(err) {
           console.log("error: ", err);
           result(null, err);
       }
       else{
           result(null, res);
       }
   }); 
};
   


onboading.updatebyemail =async function(company_email_id, credentials, result){
   
    const hashPass =await bcrypt.hash(credentials.password, 12);
        const hashPass2 =await bcrypt.hash(credentials.confirm_password, 12);
    console.log(credentials,hashPass,hashPass2)
   dbConn.query("UPDATE onboarding_credentials SET password=?,confirm_password=? WHERE company_email_id =?",
   [hashPass,hashPass2,company_email_id], function (err, res) {
         if(err) {
             console.log("error: ", err);
             result(null, err);
         }else{   
             result(null, res);
         }
     }); 
 };

 onboading.getallsearch = function (params, result) {
   
    let Project = params.Project;
    let Clients = params.Clients;
    let Date = params.Date;
    var sql = 'SELECT * FROM (onboarding_credentials INNER JOIN tbl_timesheet ON onboarding_credentials.emp_id = tbl_timesheet.employeeId) WHERE tbl_timesheet.Clients=? OR tbl_timesheet.Project=? OR tbl_timesheet.Date=?';
    dbConn.query(sql, [Clients,Project,Date], function (err, res) {      
        
        
        console.log("body",Project, Clients, Date);   
        
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
          
            result(null, res);
            console.log("search",res);
          
        }
    });   
  };

onboading.updateDetails = function(id,credentials, result){
    console.log(credentials.company_id,id)
    
    dbConn.query("UPDATE onboarding_credentials SET company_id=? WHERE company_email_id =?",
    [credentials.company_id,id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
          
            result(null, res);
            console.log("search",res);
          
        }
      }); 
   };

// onboading.updatebycmpnyid = function(company_email_id,company_id,credentials, result){
  
    
//     dbConn.query("UPDATE onboarding_credentials SET emp_name=? , company_email_id=? WHERE company_email_id =? and company_id=?",
//     [credentials.emp_name,credentials.company_email_id,company_email_id,company_id], function (err, res) {
//         if(err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else{
          
//             result(null, res);
//             console.log("search",res);
          
//         }
//       }); 
//    };


 module.exports = onboading
