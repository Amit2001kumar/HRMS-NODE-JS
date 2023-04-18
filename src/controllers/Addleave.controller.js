const Addleave = require('../models/Addleave.model')

exports.findAll = function(req, res) {
    Addleave.findAll(function(err, leaves) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', leaves);
    res.send(leaves);
  });
};

exports.findTotalLeave = function(req, res) {
    Addleave.findTotalLeave(function(err, leaves) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', leaves);
    res.send(leaves);
  });
};


exports.add = function(req, res) {
    const new_leaves = new Addleave(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Addleave.create(new_leaves, function(err, leave) {
            if (err)
            res.send(err);
            res.json({error:false,message:"leaves applied successfully!",data:leave});
        });
    }
};


exports.findById = function(req, res) {
    Addleave.findById(req.params.AddLeaveId, function(err, leave) {
        if (err)
        res.send(err);
        res.json(leave);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Addleave.update(req.params.AddLeaveId, new Addleave(req.body), function(err, leave) {
            if (err)
            res.send(err);
            res.json({ leave : leave, error:false, message: 'leaves successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    Addleave.delete( req.params.AddLeaveId, function(err, employee) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Employee successfully deleted' });
  });
};
