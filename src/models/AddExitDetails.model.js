var dbConn = require('./../../config/db.config');

//Employee object create
var AddExitDetails = function(Details){
//   this.CompanyID =           Details.CompanyID,
  this.Employee_id =            Details.Employee_id,
    this.Employee_Name=  Details.Employee_Name,
  this.Exit_Apply_Date=  Details.Exit_Apply_Date,
  this.Separation_Date =         Details.Separation_Date,
  this.Interviewer =    Details.Interviewer,
  this.Reason_for_Leaving =     Details.Reason_for_Leaving,
  this.Working_for_this_organization =  Details.Working_for_this_organization,
  this.What_did_you_like_the_most_of_the_organization = Details.What_did_you_like_the_most_of_the_organization,
  this.Think_the_organization_do_to_improve_staff_welfare = Details.Think_the_organization_do_to_improve_staff_welfare,
  this.Anything_you_wish_to_share_with_us = Details.Anything_you_wish_to_share_with_us,
  this.Company_Vechile_handed_in = Details.Company_Vechile_handed_in,
  this.All_equipments_handed_in = Details.All_equipments_handed_in,
  this.All_library_books_submitted = Details.All_library_books_submitted,
  this.Security = Details.Security,
  this.Exit_Interview_conducted = Details.Exit_Interview_conducted,
  this.Notice_period_followed = Details.Notice_period_followed,
  this.Resignation_letter_submitted = Details.Resignation_letter_submitted,
  this.Supervisor_clearance = Details.Supervisor_clearance,
this.added_by=Details.added_by,
  this.modified_by=Details.modified_by
};

// AddExitDetails.create = function (addDetail, result) {    
//   dbConn.query("INSERT INTO add_exit_details set ?", addDetail, function (err, res) {
//       if(err) {
//           console.log("error: ", err);
//           result(err, null);
//       }
//       else{
//           console.log(res.insertId);
//           result(null, res.insertId);
//       }
//   });           
// };



AddExitDetails.create = function (addDetail, result) {    
//     dbConn.query("Select * from add_holidays where Name=? and Date=?",
//     [newholidays.Name,newholidays.Date], function (err, res) {
         dbConn.query("Select * from add_exit_details where Employee_id=? and Employee_Name=?",
    [addDetail.Employee_id,addDetail.Employee_Name], function (err, res) {
             
        if(err || res.length > 0) {
            console.log("error: ", err);
            const msg = "already exist"
            result(err, msg);
           
        }
        else{
            dbConn.query("INSERT INTO add_exit_details set ?", addDetail, 
            function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res.insertId);
                   
                    
                }
            });  
        }
    }); 
     
};




AddExitDetails.findById = function (AddExitDetailsId, result) {
  dbConn.query("Select * from add_exit_details where AddExitDetailsId = ? ", AddExitDetailsId, function (err, res) {             
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          result(null, res);
      }
  });   
};

AddExitDetails.findAll = function (result) {
  dbConn.query("Select * from add_exit_details  order by added_time DESC", function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(null, err);
      }
      else{
          console.log('add_exit_details : ', res);  
          result(null, res);
      }
  });   
};

AddExitDetails.update = function(AddExitDetailsId, AddExitDetails, result){
 // const idint = bigInt(id).value;
  let m= new Date();
dbConn.query("UPDATE add_exit_details SET Employee_id= ?,Separation_Date= ?,Interviewer= ?,Reason_for_Leaving= ?,All_equipments_handed_in= ?,All_library_books_submitted= ?,Exit_Interview_conducted= ?,Resignation_letter_submitted= ?,modified_by=?,modified_time=? WHERE AddExitDetailsId= ?",
[  
    AddExitDetails.Employee_id, 
    AddExitDetails.Separation_Date,
    AddExitDetails.Interviewer,
    AddExitDetails.Reason_for_Leaving,
 
   
    AddExitDetails.All_equipments_handed_in,
    AddExitDetails.All_library_books_submitted,
    
    AddExitDetails.Exit_Interview_conducted,
  
    AddExitDetails.Resignation_letter_submitted,
      AddExitDetails.modified_by,
   m,
    AddExitDetailsId], function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(null, err);
      }else{   
          result(null, res);
      }
  }); 
};

AddExitDetails.delete = function(AddExitDetailsId, result){
   dbConn.query("DELETE FROM add_exit_details WHERE AddExitDetailsId = ?",AddExitDetailsId, function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(null, err);
      }
      else{
          result(null, res);
      }
  }); 
};



AddExitDetails.findByEmpIdName = function (Employee_id,Employee_Name,result) {
  dbConn.query("Select * from add_exit_details where Employee_id = ? OR Employee_Name = ? ",[Employee_id,Employee_Name], function (err, res) {             
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          result(null, res);
      }
  });   
};

AddExitDetails.findAllSearch = function (Employee_id,Employee_Name,result) {
    // console.log(Employee_id,Employee_Name)
    dbConn.query("Select * from add_exit_details",[Employee_id,Employee_Name], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('add_exit_details : ', res);  
            result(null, res);
        }
    });   
  };
  

module.exports= AddExitDetails;
