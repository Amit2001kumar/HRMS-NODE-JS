var dbConn = require('./../../config/db.config');




findById = function (email, result) {
 dbConn.query("select employee_address.*,experience.*,education.* FROM employee_address INNER JOIN experience ON employee_address.email=experience.email INNER JOIN education ON employee_address.email=education.email where employee_address.email=? && employee_address.address_type IN('present address') limit 1 ", email, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });

};

findById2 = function (email, result) {
    dbConn.query("select * from employee_address where address_type IN('permanent address') && email=? limit 1;", email, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });

};


findAll = function (result) {
    dbConn.query("SELECT emp.*,edu.*,exp.*, emp_add.* FROM employees emp INNER JOIN education AS edu ON emp.email = edu.email INNER JOIN experience exp ON exp.email = edu.email inner join employee_address emp_add on exp.email = emp_add.email ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('employees : ', res);
            result(null, res);
        }
    });
};

findById_Experience = function (email, result) {
    dbConn.query("select * FROM experience where email=?", email, function (err, res) {
           if (err) {
               console.log("error: ", err);
               result(err, null);
           }
           else {
               result(null, res);
           }
       });
   
   };
   
findById_Education = function (email, result) {
    dbConn.query("select * FROM education where email=? ", email, function (err, res) {
           if (err) {
               console.log("error: ", err);
               result(err, null);
           }
           else {
               result(null, res);
           }
       });
   
   };

module.exports = {findById,findById2, findAll,findById_Experience,findById_Education };
