'use strict';
var express = require('express');
const path = require('path');
var router = express.Router();

const KnowledgeCenter  = require('../models/KnowledgeCenter.model');


exports.findAll = function(req, res) {

  KnowledgeCenter.findAll(req.params.company_id,function(err, KnowledgeCenter) {
    if (err)
    res.send(err);
   
    console.log('res', KnowledgeCenter);
    res.json({ message: "KnowledgeCenter has been fetched successfully!", status: "success",data:KnowledgeCenter });
  });

};
exports.findById = function(req, res) {
  KnowledgeCenter.findById(req.params.KnowledgeCenterid, function(err, KnowledgeCenter) {
      if (err)
      res.send(err);
      
      res.json(KnowledgeCenter);
      // res.json({ message: "Attachment has been fetched successfully!", status: "success",data:KnowledgeCenter });

  });
};



exports.delete = function(req, res) {
    KnowledgeCenter.delete( req.params.KnowledgeCenterid, function(err, KnowledgeCenter) {
      if (err)
      res.send(err);
      res.json({ error:false, message: 'KnowledgeCenter successfully deleted' });
    });
  };

  // exports.download = function(req, res) {
    // var file = req.params.file;
    // var fileLocation = path.join('./src/uploads',file);
    // res.download(fileLocation, file);
    
    // console.log(fileLocation);
    // res.download(fileLocation);
   
    
  // };

  exports.findAllcenter = function(req, res) {

  KnowledgeCenter.findAllcenter(function(err, KnowledgeCenter) {
    if (err)
    res.send(err);
   
    console.log('res', KnowledgeCenter);
    res.json({ message: "KnowledgeCenter has been fetched successfully!", status: "success",data:KnowledgeCenter });
  });

};
  
