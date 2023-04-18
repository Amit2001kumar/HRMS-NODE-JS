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


// exports.add = function(req, res) {
//     const new_schedule = new AddSchedule(req.body);

//     //handles null error 
//    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//         res.status(400).send({ error:true, message: 'Please provide all required field' });
//     }else{
//         AddSchedule.create(new_schedule, function(err, schedule) {
//             if (err)
//             res.send(err);
//             res.json({error:false,message:"AddSchedule successfully!",data:schedule});
//         });
//     }
// };


exports.add = function(req, res) {
    const new_schedule = new AddSchedule(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        AddSchedule.create(new_schedule, function(err, schedule) {
           if (err)
            res.send(err);
            if (schedule === "already exist")
            res.json({data:schedule, error:true,message:"This schedule details already exist with this date!"});
            else
            res.json({data:schedule, error:false,message:"Schedule details added successfully!"});
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
        AddSchedule.update(req.params.AddScheduleId, new AddSchedule(req.body), function(err, schedule) {
            if (err)
            res.send(err);
            res.json({ schedule : schedule, error:false, message: 'AddSchedule successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    AddSchedule.delete( req.params.AddScheduleId, function(err) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'AddSchedule successfully deleted' });
  });
};



exports.findBySearch = function(req, res) {
    AddSchedule.findBySearch(req.body.ScheduleName, function(err, ScheduleName) {
        if (err)
        res.send(err);
        res.json(ScheduleName);
    });
};
exports.findAllSearch = function(req, res) {
    AddSchedule.findAllSearch(req.body, function(err, ScheduleName) {
        if (err)
        res.send(err);
        res.json(ScheduleName);
    });
};
