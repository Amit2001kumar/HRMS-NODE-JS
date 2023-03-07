const express = require('express')
const router = express.Router()
const PendingReportController = require('../controllers/PendingReport.controller');

// Retrieve all Pendingreports
router.get('/getAll', PendingReportController.findAll);

// Create a new Pendingreports
router.post('/report', PendingReportController.apply);

// Retrieve a single Pendingreports with id
router.get('/:Action', PendingReportController.findByAction);

// Update a Pendingreports with action
router.put('/:PendingReportID', PendingReportController.update);



// router.patch('/:EmployeeId', Pending_report_controller.update_leave_status);
// router.patch('/multipleid/:EmployeeId', Pending_report_controller.multipleupdateUser);



// Delete a Pendingreports with id
router.delete('/:PendingReportID', PendingReportController.delete);

module.exports = router;