const Leaves = require('../models/new_leave_type.model');

exports.create = function (req, res) {
  const new_leaves = new Leaves(req.body);

  //handles null error 
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Leaves.create(new_leaves, function (err, leave) {
      if (err)
        res.send(err);
      if (leave === "already exist")
        res.json({ data: leave, error: true, message: "Leave Type already exist with this date!" });
      else
        res.json({ data: leave, error: false, message: "New Leave Type added successfully!" });
    });
  }
};

exports.findAll = function (req, res) {
  Leaves.findAll(function (err, leaves) {
    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', leaves);
    res.send(leaves);
  });
};

exports.findById = function (req, res) {
  Leaves.findById(req.params.id, function (err, leave) {
    if (err)
      res.send(err);
    res.json(leave);
  });
};


exports.delete = function (req, res) {
  Leaves.delete(req.params.id, function (err, employee) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'leave type successfully deleted' });
  });
};

exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
      Leaves.update(req.params.id, new Leaves(req.body), function(err, leave) {
          if (err)
          res.send(err);
          res.json({ leave : leave, error:false, message: 'leave type successfully updated' });
      });
  }

};
