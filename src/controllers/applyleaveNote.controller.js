'use strict';

const Notes = require('../models/applyleaveNote.model');




exports.create = function(req, res) {
    const new_notes= new Notes(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Notes.create(new_notes, function(err, note) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Notes added successfully!",data:note});
        });
    }
};


exports.findAll = function(req, res) {
    Notes.findAll(function(err, note) {
      if (err)
      res.send(err);
      console.log('res', note);
      res.json({error:false,message:"Notes has been fetched successfully!",data:note});
    });
  };

// exports.findById = function(req, res) {
//     Notes.findById(req.params.id, function(err, notes) {
//         if (err)
//         res.send(err);
//         res.json(notes);
//     });
// };
exports.findById = function(req, res) {
    Notes.findById(req.params.employee_id, function(err, notes) {
        if (err)
        res.send(err);
        res.json(notes);
        // res.json({error:false,message:"Notes has been fetched successfully!",data:notes});

    });
};




exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Notes.update(req.params.id, new Notes(req.body), function(err, note) {
            if (err)
            res.send(err);
            res.json({notes:note, error:false, message: 'Note successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
  Notes.delete( req.params.id, function(err, note) {
    if (err)
    res.send(err);
    res.json({note: note, error:false, message: 'Note successfully deleted' });
  });
};
