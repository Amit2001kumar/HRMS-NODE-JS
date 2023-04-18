const TimeSheet = require('../models/TimeSheet.model');

exports.findAll = function (req, res) {
    TimeSheet.findAll(req.params.company_id,function (err, timeSheet) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', timeSheet);
        res.send(timeSheet);
    });
};

exports.findByEmpId = function (req, res) {
    TimeSheet.findByEmpId(req.params.employeeId,req.params.company_id, function (err, empData) {
        console.log('findEmpID controller')
        if (err)
            res.send(err);
        console.log('res', empData);
        res.send(empData);
    });
};

exports.apply = function (req, res) {
    const new_timeSheet = new TimeSheet(req.body);

    //handles null error 
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        TimeSheet.create(new_timeSheet, function (err, timeSheet) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "timeSheet applied successfully!", data: timeSheet });
        });
    }
};


exports.findById = function (req, res) {
    TimeSheet.findById(req.params.TimeSheetId, function (err, timeSheet) {
        if (err)
            res.send(err);
        res.json(timeSheet);
    });
};


exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        TimeSheet.update(req.params.TimeSheetId, new TimeSheet(req.body), function (err, timeSheet) {
            if (err)
                res.send(err);
            res.json({ leave: timeSheet, error: false, message: 'timeSheet successfully updated' });
        });
    }

};


exports.delete = function (req, res) {
    TimeSheet.delete(req.params.TimeSheetId, function (err, employee) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'timeSheet successfully deleted' });
    });
};


exports.month = function (req, res) {
    TimeSheet.month(req.params.employeeId, function (err, timeSheet) {
        if (err)
            res.send(err);
        res.json(timeSheet[0]);
    });
};


exports.findBySearch = function(req, res) {
    TimeSheet.findBySearch(req.body, function(err, timesheet) {
        if (err)
        res.send(err);
        res.json(timesheet);
    });
};

exports.updateForApproval = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
//         console.log("......",req.params.employeeId,req.params.TimeSheetId);
        TimeSheet.updateForApproval(req.params.employeeId,req.params.TimeSheetId, new TimeSheet(req.body), function (err, timeSheet) {
            if (err)
                res.send(err);
            res.json({ leave: timeSheet, error: false, message: 'timeSheet successfully updated for Approval' });
        });
    }

};
