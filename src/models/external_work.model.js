var dbConn = require('./../../config/db.config');

var onboading = function(credentials){
    
    this.emp_id  = credentials.emp_id;
    this.emp_name  = credentials.emp_name;
    this.location  = credentials.location;
    this.roll_id  = credentials.roll_id;
    this.designation  = credentials.designation;
    this.joining_date   = credentials.joining_date;
   
      
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
   dbConn.query("UPDATE onboarding_credentials SET emp_id=?,emp_name=?,location=?,roll_id=?,designation=?,joining_date=? WHERE id =?",
   [credentials.emp_id,credentials.emp_name,credentials.location,credentials.roll_id,,credentials.designation,credentials.joining_date,id], function (err, res) {
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

 module.exports = onboading
