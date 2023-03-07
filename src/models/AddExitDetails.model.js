var dbConn = require('./../../config/db.config');

//Employee object create
var AddExitDetails = function(Details){
//   this.CompanyID =           Details.CompanyID,
  this.Employee_id =            Details.Employee_id,
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
  this.Security = Details.Security
};

AddExitDetails.create = function (addDetail, result) {    
  dbConn.query("INSERT INTO add_exit_details set ?", addDetail, function (err, res) {
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
  dbConn.query("Select * from add_exit_details", function (err, res) {
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
dbConn.query("UPDATE add_exit_details SET Employee_id= ?,Separation_Date= ?,Interviewer= ?,Reason_for_Leaving= ?,Working_for_this_organization= ?,What_did_you_like_the_most_of_the_organization= ?,Think_the_organization_do_to_improve_staff_welfare= ?,Anything_you_wish_to_share_with_us= ?,Company_Vechile_handed_in= ?,All_equipments_handed_in= ?,All_library_books_submitted= ?,Security= ?,Exit_Interview_conducted= ?,Notice_period_followed= ?,Resignation_letter_submitted= ?,Supervisor_clearance= ? WHERE AddExitDetailsId= ?",
[  
    AddExitDetails.Employee_id, 
    AddExitDetails.Separation_Date,
    AddExitDetails.Interviewer,
    AddExitDetails.Reason_for_Leaving,
    AddExitDetails.Working_for_this_organization,
    AddExitDetails.What_did_you_like_the_most_of_the_organization,
    AddExitDetails.Think_the_organization_do_to_improve_staff_welfare,
    AddExitDetails.Anything_you_wish_to_share_with_us,
    AddExitDetails.Company_Vechile_handed_in,
    AddExitDetails.All_equipments_handed_in,
    AddExitDetails.All_library_books_submitted,
    AddExitDetails.Security,
    AddExitDetails.Exit_Interview_conducted,
    AddExitDetails.Notice_period_followed,
    AddExitDetails.Resignation_letter_submitted,
    AddExitDetails.Supervisor_clearance,
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
   dbConn.query("DELETE FROM add_exit_details WHERE AddExitDetailsId = ?", [AddExitDetailsId], function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(null, err);
      }
      else{
          result(null, res);
      }
  }); 
};

module.exports= AddExitDetails;