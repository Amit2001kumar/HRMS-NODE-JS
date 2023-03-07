const bigInt = require("big-integer");
var dbConn = require('./../../config/db.config');

//branchlocationdetails object create
var branchlocationdetails = function(details){
    // this.Location_id     = details.Location_id;
    this.Branch_Name      = details.Branch_Name;
    this.Streetaddress          = details.Streetaddress;
    this.Postalcode          = details.Postalcode;
    this.City         = details.City;
    this.Stateprovince   = details.Stateprovince;
    this.Countryid    = details.Countryid;
    // this.uploadedDate = details.uploadedDate;
    this.uploadedBy     = details.uploadedBy
   // this.updated_at     = new Date();
      
    
};
branchlocationdetails.create = function (newbranchlocationdetails, result) {    
    dbConn.query("INSERT INTO branchlocationdetails set ?", newbranchlocationdetails, function (err, res) {
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

branchlocationdetails.findById = function (Location_id, result) {
    dbConn.query("Select * from branchlocationdetails where Location_id = ? ", Location_id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

branchlocationdetails.findAll = function (result) {
    dbConn.query("Select * from branchlocationdetails", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('branchlocationdetails : ', res);  
            result(null, res);
        }
    });   
};

branchlocationdetails.update = function(Location_id, detail, result){
  
  dbConn.query("UPDATE branchlocationdetails SET Branch_Name=?,Streetaddress=?,Postalcode=?,City=?,Stateprovince=?,Countryid=?, uploadedBy=? WHERE Location_id =?",
  [detail.Branch_Name,detail.Streetaddress,detail.Postalcode,detail.City,detail.Stateprovince,detail.Countryid, detail.uploadedBy,Location_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

branchlocationdetails.delete = function(Location_id, result){
     dbConn.query("DELETE FROM branchlocationdetails WHERE Location_id = ?", [Location_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= branchlocationdetails;
