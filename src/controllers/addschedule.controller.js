const AddSchedule = require('../models/addschedule.model');

exports.findAll = function(req, res) {
    AddSchedule.findAll(function(err, schedule) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', schedule);
    res.send(schedule);
  });
};


exports.add = function(req, res) {
    const new_schedule = new AddSchedule(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        AddSchedule.create(new_schedule, function(err, schedule) {
            if (err)
            res.send(err);
            res.json({error:false,message:"AddSchedule successfully!",data:schedule});
        });
    }
};


exports.findById = function(req, res) {
    AddSchedule.findById(req.params.AddScheduleId, function(err, schedule) {
        if (err)
        res.send(err);
        res.json(schedule);
    });
};



exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        AddSchedule.update(req.params.AddScheduleId, new Addschedule(req.body), function(err, schedule) {
            if (err)
            res.send(err);
            res.json({ schedule : schedule, error:false, message: 'AddSchedule successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    Addschedule.delete( req.params.AddScheduleId, function(err, schedule) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'AddSchedule successfully deleted' });
  });
};