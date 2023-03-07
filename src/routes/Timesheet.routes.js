const express = require('express')
const router = express.Router()
const TimesheetController = require('../controllers/Timesheet.controller');

// Retrieve all timesheet
router.get('/getAll', TimesheetController.findAll);

// Create a new timesheet
router.post('/insert', TimesheetController.apply);

// Retrieve a single timesheet with id
router.get('/:TimeSheetId', TimesheetController.findById);

// Update a timesheet with id
router.put('/:TimeSheetId', TimesheetController.update);

// Delete a timesheet with id
router.delete('/:TimeSheetId', TimesheetController.delete);


router.get('/totalworkinghrs/:employeeId', TimesheetController.month);


router.get('/emp/:employeeId', TimesheetController.findByEmpId);

// Retrieve a  project with search result
router.post('/search', TimesheetController.findBySearch);

module.exports = router;
