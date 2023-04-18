const AddExitDetails = require('../models/AddExitDetails.model');


exports.findAll = function(req, res) {
    AddExitDetails.findAll(function(err, Details) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', Details);
    res.send(Details);
  });
};


exports.add = function(req, res) {
    const new_Details = new AddExitDetails(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        AddExitDetails.create(new_Details, function(err, Details) {
             if (err)
            res.send(err);
            if (Details === "already exist")
            res.json({data:Details, error:true,message:"This employee name or id already exist!"});
            else
            res.json({data:Details, error:false,message:"Exit details added successfully!"});
        });
    }
};


exports.findById = function(req, res) {
    AddExitDetails.findById(req.params.Employee_id, function(err, Details) {
        if (err)
        res.send(err);
        res.json(Details);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        AddExitDetails.update(req.params.Employee_id, new AddExitDetails(req.body), function(err, Details) {
            if (err)
            res.send(err);
            res.json({ Details : Details, error:false, message: 'AddExitDetails successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    AddExitDetails.delete( req.params.AddExitDetailsId, function(err, employee) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Employee successfully deleted' });
  });
};

exports.findByEmpIdName = function(req, res) {
    AddExitDetails.findByEmpIdName(req.body.Employee_id,req.body.Employee_Name, function(err, Details) {
        if (err)
        res.send(err);
        res.json(Details);
    });
};
exports.findAllSearch = function(req, res) {
    AddExitDetails.findAllSearch(req.body.Employee_id,req.body.Employee_Name, function(err, Details) {
        if (err)
        res.send(err);
        res.json(Details);
    });
};
