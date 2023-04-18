'use strict';

const Company = require('../models/company.model');

exports.findAll = function(req, res) {
    Company.findAll(function(err, company) {
    console.log('---Company controller---');
    console.log('Company Request', req)
    if (err)
    res.send(err); 
    console.log('res', company);
    res.send(company);
  });
};


exports.create = function(req, res) {
    const new_company = new Company(req.body);
    //handles null error 
//    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//         res.status(400).send({ error:true, message: 'Please provide all required field' });
//     }else{
        Company.create(new_company,  function(err, company) {
            if (err)
            res.send(err);
            if (company === "already exist")
            res.json({data:company, error:true,message:"This email already exist with this company!"});
            else
            res.json({data:company, error:false,message:"Company details added successfully!"});
        });
//     }
};

exports.findById = function(req, res) {
    Company.findById(req.params.company_id, function(err, company) {
        if (err)
        res.send(err);
        res.json(company);
    });
};

exports.findByDomain = function(req, res) {
    console.log("controller",req)
    console.log("param",req.params.company_domain)
    Company.findByDomain(req.params.company_domain, function(err, company) {
        
        if (err)
        res.send(err);
        res.json(company);
    });
};
exports.findByDomain = function(req, res) {
    Company.findByDomain(req.params.company_domain, function(err, company) {
        if (err)
        res.send(err);
        res.json(company);
    });
};


exports.findBySearch = function(req, res) {
    Company.findBySearch(req.body, function(err, company) {
        if (err)
        res.send(err);
        res.json(company);
    });
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Company.update(req.params.company_id, new Company(req.body), function(err, company) {
            if (err)
            res.send(err);
            res.json({ company: company,error:false, message: 'Company successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
  Company.delete( req.params.company_id, function(err, company) {
    if (err)
    res.send(err);
    res.json({ company:company,error:false, message: 'Company successfully deleted' });
  });
};
