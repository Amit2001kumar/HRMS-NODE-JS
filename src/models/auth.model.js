'user strict';
var dbConn = require('./../../config/db.config');

const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

//Employee object create
var Employee = function(employee){
    this.name     = employee.name;
    this.email          = employee.email;
    this.password   = employee.password;
    this.confirm_password    = employee.confirm_password;
    this.status         = employee.status ? employee.status : 1;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};
Employee.create = function (newEmp, results, res ) { 
    const { name, email, password, confirm_password } = newEmp;
    dbConn.query(
        "select email from users where email=?",
        [email],
        async (error, result) => {
          if (error) {
            confirm.log(error);
          }
    
          if (result.length > 0) {
            console.log("error: ", error);
            results(error, null);
          } else if (password !== confirm_password) {
            console.log("error: ", error);
            results(null, res);
          }
          let hashedPassword = await bcrypt.hash(password, 8);
         // let hashedConfirmed_Password = await bcrypt.hash(confirm_password, 8);
          //console.log(hashedPassword);
    
          dbConn.query("INSERT INTO users set ?",
           { name: name, email: email, password: hashedPassword , confirm_password : confirm_password},
            function (err, res) {
            if(err) {
                console.log("error: ", err);
                results(err, null);
            }
            else{
                console.log(res.insertId);
                results(null, res.insertId);
            }
        });
        }
      );
    };
   /* dbConn.query("INSERT INTO employees set ?", newEmp, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });   */        

Employee.findById = function (id, result) {
    dbConn.query("Select * from employees where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Employee.findAll = function (result) {
    dbConn.query("Select * from employees", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('employees : ', res);  
            result(null, res);
        }
    });   
};
Employee.update = function(id, employee, result){
  dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=?, experience=?, WHERE id = ?", [employee.first_name,employee.last_name,employee.email,employee.phone,employee.organization,employee.designation,employee.salary, employee.experience, employee.additional_information, employee.currently_work_here, employee.designation,id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Employee.delete = function(id, result){
     dbConn.query("DELETE FROM employees WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Employee;