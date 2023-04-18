const Project = require('../models/project.model');


exports.create = function (req, res) {
    const new_project = new Project(req.body);
    console.log(req.body)
    const repository = req.body.repository;
    console.log(req.body.repository)

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Project.create(new_project, repository, function (err, project) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "Projects added successfully!", data: project });
        });
    }
};


exports.delete = function (req, res) {
    Project.delete(req.params.project_name, function (err, project) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Projects successfully deleted' });
    });
};


// exports.update = function(req, res) {
//     if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//         res.status(400).send({ error:true, message: 'Please provide all required field' });
//     }else{
//         Project.update(req.params.id, new Project(req.body), function(err, project) {
//             if (err)
//             res.send(err);
//             res.json({ project: project,error:false, message: 'Project successfully updated' });
//         });
//     }
  
// };


exports.update = function (req, res) {
    const new_project = new Project(req.body);
    const repository = req.body.repository;

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
        // console.log("if",req.body)
    } else {
        // console.log("else",req.body)

        Project.update(req.params.project_name, new_project, repository, function (err) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'Projects successfully updated' });
        });
    }
};


exports.findAll = function (req, res) {
    Project.findAll(function (err, project) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', project);
        res.send(project);
    });
};

// exports.findById = function(req, res) {
//     Project.findById(req.params.id, function(err, project) {
//         if (err)
//         res.send(err);
//         res.json(project);
//     });
// };

exports.findById = function(req, res) {
    Project.findById(req.params.project_name, function(err, project) {
        if (err)
        res.send(err);
        res.json(project);
    });
};

exports.findBySearch = function(req, res) {
    Project.findBySearch(req.body, function(err, project) {
        if (err)
        res.send(err);
        res.json(project);
    });
};

exports.findByMultiSearch = function(req, res) {
    Project.findByMultiSearch(req.body, function(err, project) {
        if (err)
        res.send(err);
        res.json(project);
    });
};
