const Dashboard = require('../models/Dashboard.model');

exports.birthday = function (req, res) {
    Dashboard.birthday(function (err, birthday) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', birthday);
        res.send(birthday);
    });
};


exports.leaves = function (req, res) {
    Dashboard.leaves(function (err, leaves) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', leaves);
        res.send(leaves);
    });
};

exports.newHire = function (req, res) {
    Dashboard.newHire(function (err, newHire) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', newHire);
        res.send(newHire);
    });
};

exports.knowledgeCenter = function (req, res) {
    Dashboard.knowledgeCenter(function (err, knowledgeCenter) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', knowledgeCenter);
        res.send(knowledgeCenter);
    });
};


exports.approvalForRequests = function (req, res) {
    Dashboard.approvalForRequests(req.params.EmployeeId, function (err, approvalForRequests) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', approvalForRequests);
        res.send(approvalForRequests);
    });
};


exports.upcomingHolidays = function (req, res) {
    Dashboard.upcomingHolidays(function (err, upcomingHolidays) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', upcomingHolidays);
        res.send(upcomingHolidays);
    });
};


exports.timesheet = function (req, res) {
    Dashboard.timesheet(function (err, timesheet) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', timesheet);
        res.send(timesheet);
    });
};


exports.Announcements = function (req, res) {
    Dashboard.Announcements(function (err, announcements) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', announcements);
        res.send(announcements);
    });
};
