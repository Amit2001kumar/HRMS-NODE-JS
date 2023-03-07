const ApplyLeaves = require('../models/applyleaves.model');

exports.findAll = function(req, res) {
    ApplyLeaves.findAll(function(err, leaves) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', leaves);
    res.send(leaves);
  });
};


exports.apply = function(req, res) {
    const new_leaves = new ApplyLeaves(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        ApplyLeaves.create(new_leaves, function(err, leave) {
            if (err)
            res.send(err);
            res.json({error:false,message:"leaves applied successfully!",data:leave});
        });
    }
};


exports.Totalleave = function(req, res) {
    ApplyLeaves.Totalleave( function(err, leave) {
        if (err)
        res.send(err);
        res.json(leave);
    });
};


exports.findById = function(req, res) {
    ApplyLeaves.findById(req.params.employee_id, function(err, leave) {
        if (err)
        res.send(err);
        res.json(leave);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        ApplyLeaves.update(req.params.employee_id, new ApplyLeaves(req.body), function(err, leave) {
            if (err)
            res.send(err);
            res.json({ leave : leave, error:false, message: 'leaves successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    ApplyLeaves.delete( req.params.employee_id, function(err, employee) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Employee successfully deleted' });
  });
};
