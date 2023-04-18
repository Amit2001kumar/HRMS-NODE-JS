const documentmanagement = require('../models/document_management.model');

exports.findAll = function(req, res) {
    documentmanagement.findAll(function(err, doc) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', doc);
    res.send(doc);
  });
};


exports.apply = function(req, res) {
    const new_doc = new documentmanagement(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        documentmanagement.create(new_doc, function(err, doc) {
            if (err)
            res.send(err);
            res.json({error:false,message:  doc });
            // console.log(res)
        });
    }
    // console.log("controller",res);
};


exports.findById = function(req, res) {
    documentmanagement.findById(req.params.documenttype, function(err, doc) {
        if (err)
        res.send(err);
        res.json(doc);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        documentmanagement.update(req.params.documentid, new documentmanagement(req.body), function(err, doc) {
            if (err)
            res.send(err);
            res.json({ doc : doc, error:false, message: 'doc successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    documentmanagement.delete( req.params.documentid, function(err, documentmanagement) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'documentmanagement successfully deleted' });
  });
};

exports.documentname = function(req, res) {
    documentmanagement.documentname(req.params.documentname,req.params.module, function(err, doc) {
        console.log(req.params.documentname,req.params.module)
        if (err)
        res.send(err);
        res.json(doc);
    });
};


exports.module = function(req, res) {
    documentmanagement.module(req.params.module, function(err, doc) {
        if (err)
        res.send(err);
        res.json(doc);
    });
};



exports.findBySearch = function(req, res) {
    documentmanagement.findBySearch(req.body, function(err, doc) {
        if (err)
        res.send(err);
        res.json(doc);
    });
};
