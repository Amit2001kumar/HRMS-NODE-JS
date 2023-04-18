const Announcements = require('../models/Announcements.model');

exports.findAll = function(req, res) {
    Announcements.findAll(req.params.company_id,function(err, Announcements) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', Announcements);
    res.send(Announcements);
  });
};


exports.apply = function(req, res) {
    const new_Announcements = new Announcements(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Announcements.create(new_Announcements, function(err, Announcements) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Announcements applied successfully!",data:Announcements});
        });
    }
};


exports.findById = function(req, res) {
    Announcements.findById(req.params.Announcementsid, function(err, Announcements) {
        if (err)
        res.send(err);
        res.json(Announcements);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Announcements.update(req.params.Announcementsid, new Announcements(req.body), function(err, Announcements) {
            if (err)
            res.send(err);
            res.json({ Announcements : Announcements, error:false, message: 'Announcements successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    Announcements.delete( req.params.Announcementsid, function(err, Announcements) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Announcements successfully deleted' });
  });
};
