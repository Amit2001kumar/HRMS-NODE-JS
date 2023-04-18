
var dbConn = require('./../../config/db.config');

//holydays object create
var AddHolidays = function(holidays){
    this.HolidayType     = holidays.HolidayType;
    this.Name      = holidays.Name;  
    this.Date          = holidays.Date;
    this.backgroundColor=holidays.backgroundColor;
    this.textColor=holidays.textColor;
    this.ApplicableFor   = holidays.ApplicableFor;
//     this.Restricted         = holidays.Restricted;
    this.Description    = holidays.Description;
    this.No_ofday_before_which_the_reminder_should_be_sent = holidays.No_ofday_before_which_the_reminder_should_be_sent;
//     this.Notify_Applicable_Employees         = holidays.Notify_Applicable_Employees;
//     this.Reprocess_leave_applications_based_on_this_added_holiday   = holidays.Reprocess_leave_applications_based_on_this_added_holiday;
    this.createdDate     = new Date();
   
};
AddHolidays.create = function (newholidays, result) {    
//     dbConn.query("Select * from add_holidays where Name=? and Date=?",
//     [newholidays.Name,newholidays.Date], function (err, res) {
         dbConn.query("Select * from add_holidays where Name=?",
    [newholidays.Name], function (err, res) {
             
        if(err || res.length > 0) {
            console.log("error: ", err);
            const msg = "already exist"
            result(err, msg);
           
        }
        else{
            dbConn.query("INSERT INTO add_holidays set ?", newholidays, 
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

AddHolidays.findById = function (HolidayId, result) {
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

AddHolidays.findAll = function (result) {
    dbConn.query("Select * from add_holidays order by createdDate DESC", function (err, res) {
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

AddHolidays.update = function(HolidayId, holyday, result){
   // const idint = bigInt(id).value;
  dbConn.query("UPDATE add_holidays SET HolidayType=?,Name=?,backgroundColor=?,textColor=?,Date=?,ApplicableFor=?,Description=?, No_ofday_before_which_the_reminder_should_be_sent=? WHERE HolidayId =?",
  [holyday.HolidayType,holyday.Name,holyday.backgroundColor,holyday.textColor,holyday.Date,holyday.ApplicableFor,holyday.Description, holyday.No_ofday_before_which_the_reminder_should_be_sent,HolidayId], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

AddHolidays.delete = function(HolidayId, result){
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

module.exports= AddHolidays;
