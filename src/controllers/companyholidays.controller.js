const companyholidays = require('../models/companyholidays.model');

exports.findAll = function(req, res) {
    companyholidays.findAll(function(err, holidays) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', holidays);
    res.send(holidays);
  });
};


exports.companyHoliday = function(req, res) {
    const new_holidays = new companyholidays(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        companyholidays.create(new_holidays, function(err, holiday) {
            if (err)
            res.send(err);
            res.json({error:false,message:"holidays applied successfully!",data:holiday});
        });
    }
};


exports.findById = function(req, res) {
    companyholidays.findById(req.params.HolidayId, function(err, holiday) {
        if (err)
        res.send(err);
        res.json(holiday);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        companyholidays.update(req.params.HolidayId, new companyholidays(req.body), function(err, holiday) {
            if (err)
            res.send(err);
            res.json({ holiday : holiday, error:false, message: 'holidays successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    companyholidays.delete( req.params.HolidayId, function(err, holiday) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'holiday successfully deleted' });
  });
};