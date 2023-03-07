
var dbConn = require('./../../config/db.config');

//holydays object create
var companyholidays = function(holidays){
    this.HolidayType     = holidays.HolidayType;
    this.Name      = holidays.Name;  
    this.Date          = holidays.Date;
    this.ApplicableFor   = holidays.ApplicableFor;
    this.Restricted         = holidays.Restricted;
    this.Description    = holidays.Description;
    this.No_ofday_before_which_the_reminder_should_be_sent = holidays.No_ofday_before_which_the_reminder_should_be_sent;
    this.Notify_Applicable_Employees         = holidays.Notify_Applicable_Employees;
    this.Reprocess_leave_applications_based_on_this_added_holiday   = holidays.Reprocess_leave_applications_based_on_this_added_holiday;
    this.createdDate     = new Date();
   
};
companyholidays.create = function (newholidays, result) {    
    dbConn.query("INSERT INTO add_holidays set ?", newholidays, function (err, res) {
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

companyholidays.findById = function (HolidayId, result) {
    dbConn.query("Select * from add_holidays where HolidayId = ? ", HolidayId, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

companyholidays.findAll = function (result) {
    dbConn.query("Select * from add_holidays", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('holidays : ', res);  
            result(null, res);
        }
    });   
};

companyholidays.update = function(HolidayId, holyday, result){
   // const idint = bigInt(id).value;
  dbConn.query("UPDATE add_holidays SET HolidayType=?,Name=?,Date=?,ApplicableFor=?,Restricted=?,Description=?, No_ofday_before_which_the_reminder_should_be_sent=?,Notify_Applicable_Employees=?,Reprocess_leave_applications_based_on_this_added_holiday=? WHERE HolidayId =?",
  [holyday.HolidayType,holyday.Name,holyday.Date,holyday.ApplicableFor,holyday.Restricted,holyday.Description, holyday.No_ofday_before_which_the_reminder_should_be_sent,holyday.Notify_Applicable_Employees,holyday.Reprocess_leave_applications_based_on_this_added_holiday,HolidayId], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

companyholidays.delete = function(HolidayId, result){
     dbConn.query("DELETE FROM add_holidays WHERE HolidayId = ?", [HolidayId], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= companyholidays;