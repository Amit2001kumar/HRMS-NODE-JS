const Candidatedetail = require('../models/Candidatedetail.model');

exports.findAll = function(req, res) {
  Candidatedetail.findAll(function(err, Candidatedetail) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', Candidatedetail);
    res.send(Candidatedetail);
  });
};



exports.findById = function(req, res) {
    Candidatedetail.findById(req.params.email, function(err, Candidatedetail) {
        if (err)
        res.send(err);
        res.json(Candidatedetail);
    });
};
exports.findById2= function(req, res) {
  Candidatedetail.findById2(req.params.email, function(err, Candidatedetail) {
      if (err)
      res.send(err);
      res.json(Candidatedetail);
  });
};
exports.findById_Education = function(req, res) {
  Candidatedetail.findById_Education(req.params.email, function(err, Candidatedetail) {
      if (err)
      res.send(err);
      res.json(Candidatedetail);
  });
};
exports.findById_Experience = function(req, res) {
  Candidatedetail.findById_Experience(req.params.email, function(err, Candidatedetail) {
      if (err)
      res.send(err);
      res.json(Candidatedetail);
  });
};
