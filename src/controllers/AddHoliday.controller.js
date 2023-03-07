const AddHolidays = require('../models/AddHoliday.model');

exports.findAll = function(req, res) {
    AddHolidays.findAll(function(err, holidays) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', holidays);
    res.send(holidays);
  });
};


exports.add = function(req, res) {
    const new_holidays = new AddHolidays(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        AddHolidays.create(new_holidays, function(err, holiday) {
            if (err)
            res.send(err);
            res.json({error:false,message:"holidays applied successfully!",data:holiday});
        });
    }
}; 


exports.findById = function(req, res) {
    AddHolidays.findById(req.params.HolidayId, function(err, holiday) {
        if (err)
        res.send(err);
        res.json(holiday);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        AddHolidays.update(req.params.HolidayId, new AddHolidays(req.body), function(err, holiday) {
            if (err)
            res.send(err);
            res.json({ holiday : holiday, error:false, message: 'holidays successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    AddHolidays.delete( req.params.HolidayId, function(err, holiday) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'holiday successfully deleted' });
  });
};