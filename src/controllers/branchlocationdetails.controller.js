const branchlocationdetails = require('../models/branchlocationdetails.model');

exports.findAll = function(req, res) {
    branchlocationdetails.findAll(function(err, detailss) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', detailss);
    res.send(detailss);
  });
};


exports.apply = function(req, res) {
    const new_details = new branchlocationdetails(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        branchlocationdetails.create(new_details, function(err, details) {
            if (err)
            res.send(err);
            res.json({error:false,message:"details applied successfully!",data:details});
        });
    }
};


exports.findById = function(req, res) {
    branchlocationdetails.findById(req.params.Location_id, function(err, details) {
        if (err)
        res.send(err);
        res.json(details);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        branchlocationdetails.update(req.params.Location_id, new branchlocationdetails(req.body), function(err, details) {
            if (err)
            res.send(err);
            res.json({ details : details, error:false, message: 'detailss successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    branchlocationdetails.delete( req.params.Location_id, function(err, branchlocation) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'branchlocation successfully deleted' });
  });
};