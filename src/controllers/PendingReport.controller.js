const PendingReport = require('../models/PendingReport.model');

exports.findAll = function(req, res) {
    PendingReport.findAll(function(err, pendingReport) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', pendingReport);
    res.send(pendingReport);
  });
};


exports.apply = function(req, res) {
    const new_leaves = new PendingReport(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        PendingReport.create(new_leaves, function(err, pendingReport) {
            if (err)
            res.send(err);
            res.json({error:false,message:"pendingReport applied successfully!",data:pendingReport});
        });
    }
};


exports.findByAction = function(req, res) {
    PendingReport.findByAction(req.params.Action, function(err, pendingReport) {
        if (err)
        res.send(err);
        res.json(pendingReport);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        PendingReport.update(req.params.PendingReportID , new PendingReport(req.body), function(err, pendingReport) {
            if (err)
            res.send(err);
            res.json({ pendingReport : pendingReport, error:false, message: 'pendingReport successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    PendingReport.delete( req.params.PendingReportID , function(err, pendingReport) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'pendingReport successfully deleted' });
  });
};


// ............................updateUser...........................................


exports.updateById = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        console.log("..",req.params.EmployeeId,req.body);
        PendingReport.updateById(req.params.EmployeeId , new PendingReport(req.body), function(err, pendingReport) {
            if (err)
            res.send(err);
            res.json({ pendingReport : pendingReport, error:false, message: 'pendingReport Action successfully updated' });
        });
    }
  
};
