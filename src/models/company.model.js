'user strict';
var dbConn = require('./../../config/db.config');

//Company object create
var Company = function(company){
    this.company_id     = company.company_id;
    this.company_name      = company.company_name;
    this.company_email          = company.company_email;
    this.portal          = company.portal;
    this.company_domain = company.company_domain;
    this.industry   = company.industry;
    this.number_of_employee = company.number_of_employee;
    this.tax_information =company.tax_information;
    this.company_logo = company.company_logo;
    this.country = company.country;
    this.state = company.state;
    this.city = company.city;
    this.zip_pin_code = company.zip_pin_code;
    this.street_address = company.street_address;
    this.status         = company.status ? company.status : 1;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};

// Company.create = function (newCompany, result) {  

//     dbConn.query("INSERT INTO company set ?", newCompany, 
//     function (err, res) {
//         if(err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else{
//             result(null, res.insertId);
//             //result(null, res);
            
//         }
//     });   
// };



Company.create = function (newCompany, result) {    
//     dbConn.query("Select * from add_holidays where Name=? and Date=?",
//     [newholidays.Name,newholidays.Date], function (err, res) {
         dbConn.query("Select * from company where company_name=? and company_email=?",
    [newCompany.company_name,newCompany.company_email], function (err, res) {
             
        if(err || res.length > 0) {
            console.log("error: ", err);
            const msg = "already exist"
            result(err, msg);
           
        }
        else{
            dbConn.query("INSERT INTO company set ?", newCompany, 
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





Company.findById = function (company_id, result) {
    var sql = 'SELECT * FROM company WHERE company_id = ?';
    dbConn.query(sql, [company_id], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};        



Company.findByDomain = function (company_domain, result) {
    console.log("model",company_domain)
    var sql = 'SELECT * FROM company WHERE company_domain = ?';
    console.log("model",sql)

    dbConn.query(sql,company_domain, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};  


Company.findBySearch = function (params, result) {
    let company_email = params.company_email;
    let company_id = params.company_id;
    let company_name = params.company_name;
    var sql = 'SELECT * FROM company WHERE company_email = ? OR company_id = ? OR company_name = ?';
    dbConn.query(sql, [company_email, company_id, company_name], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Company.findAll = function (result) {
    dbConn.query("Select * from company", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('company : ', res);  
            result(null, res);
        }
    });   
};
Company.update = function(company_id, company, result){
  dbConn.query
  ("UPDATE company SET company_name=?,company_email=?,portal=?,industry=?,number_of_employee=? ,tax_information = ? ,company_logo= ?,country = ?,state = ?, city=?,zip_pin_code = ?,street_address = ? WHERE company_id = ?", 
  [company.company_name,company.company_email,company.portal, 
    company.industry,company.number_of_employee,company.tax_information,company.company_logo,
    company.country,company.state,company.city,company.zip_pin_code,company.street_address,company_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Company.delete = function(company_id, result){
     dbConn.query("DELETE FROM company WHERE company_id = ?", [company_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Company;
