const AddWorkingDay = require('../models/AddWorkingDay.model');

exports.findAll = function(req, res) {
    AddWorkingDay.findAll(function(err, WorkingDay) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', WorkingDay);
    res.send(WorkingDay);
  });
};


exports.add = function(req, res) {
    const new_WorkingDay = new AddWorkingDay(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        AddWorkingDay.create(new_WorkingDay, function(err, WorkingDay) {
            if (err)
            res.send(err);
            res.json({error:false,message:"WorkingDay inserted successfully!",data:WorkingDay});
        });
    }
};


exports.findById = function(req, res) {
    AddWorkingDay.findById(req.params.id, function(err, WorkingDay) {
        if (err)
        res.send(err);
        res.json(WorkingDay);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        AddWorkingDay.update(req.params.id, new AddWorkingDay(req.body), function(err, WorkingDay) {
            if (err)
            res.send(err);
            res.json({ WorkingDay : WorkingDay, error:false, message: 'WorkingDay successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    AddWorkingDay.delete( req.params.id, function(err, employee) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'AddWorkingDay successfully deleted' });
  });
};