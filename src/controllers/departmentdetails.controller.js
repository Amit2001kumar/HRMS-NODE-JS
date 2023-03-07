const departmentdetails = require('../models/departmentdetails.model');

exports.findAll = function(req, res) {
    departmentdetails.findAll(function(err, details) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', details);
    res.send(details);
  });
};


exports.apply = function(req, res) {
    const new_details = new departmentdetails(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        departmentdetails.create(new_details, function(err, details) {
            if (err)
            res.send(err);
            res.json({error:false,message:"details applied successfully!",data:details});
        });
    }
};


exports.findById = function(req, res) {
    departmentdetails.findById(req.params.departmentId, function(err, details) {
        if (err)
        res.send(err);
        res.json(details);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        departmentdetails.update(req.params.departmentId, new departmentdetails(req.body), function(err, details) {
            if (err)
            res.send(err);
            res.json({ details : details, error:false, message: 'details successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    departmentdetails.delete( req.params.departmentId, function(err, employee) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'details successfully deleted' });
  });
};