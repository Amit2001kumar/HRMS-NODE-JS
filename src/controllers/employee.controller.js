'use strict';

const Employee = require('../models/employee.model');

exports.findAll = function(req, res) {
  Employee.findAll(req.params.company_id,function(err, employee) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', employee);
    res.send(employee);
  });
};


exports.create = function(req, res) {
    const new_employee = new Employee(req.body);
    const education= req.body.education;
    const experience= req.body.experience;
   
    const address= req.body.address;
   const pAddress=req.body.pAddress;
    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Employee.create(new_employee, education, experience,address,pAddress,function(err, employee) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Employee added successfully!",data:employee});
        });
    }
};


exports.findById = function(req, res) {
    Employee.findById(req.params.email, function(err, employee) {
        if (err)
        res.send(err);
        res.json(employee);
    });
};


// exports.update = function(req, res) {
//     if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//         res.status(400).send({ error:true, message: 'Please provide all required field' });
//     }else{
//         Employee.update(req.params.id, new Employee(req.body), function(err, employee) {
//             if (err)
//             res.send(err);
//             res.json({ employee: employee,error:false, message: 'Employee successfully updated' });
//         });
//     }
  
// };


exports.update = function(req, res) {
    const new_employee = new Employee(req.body);
    const education= req.body.education;
    const experience= req.body.experience;
    const docs= req.body.docs;
    const address= req.body.address;
    const pAddress=req.body.pAddress;
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
        // console.log("if",req.body)
    }else{
        // console.log("else",req.body)

        Employee.update(req.params.email, new_employee,education, experience,address,pAddress, function(err) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Employee successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
  Employee.delete( req.params.email, function(err, employee) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Employee successfully deleted' });
  });
};


exports.updateAfterPreonBoarding = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Employee.updateAfterPreonBoarding(req.params.email, new Employee(req.body), function(err, Details) {
            if (err)
            res.send(err);
            res.json({ Details : Details, error:false, message: 'Employee successfully updated' });
        });
    }
  
};

exports.findEmployeeByEmployeeId = function(req, res) {
    Employee.findEmployeeByEmployeeId(req.body.employee_id, function(err, employee) {
        if (err)
        res.send(err);
        res.json(employee);
    });
};

exports.SearchEmployeeByEmployeeIdAndName = function(req, res) {
    Employee.SearchEmployeeByEmployeeIdAndName(req.body.company_id,req.body.employee_id,req.body.first_name,req.body.last_name, function(err, employee) {
        if (err)
        res.send(err);
        res.json(employee);
    });
};

exports.SearchAllEmployeeByEmployeeIdAndName = function(req, res) {
    Employee.SearchAllEmployeeByEmployeeIdAndName(req.body.company_id,req.body.employee_id,req.body.first_name,req.body.last_name, function(err, employee) {
        if (err)
        res.send(err);
        res.json(employee);
    });
};
