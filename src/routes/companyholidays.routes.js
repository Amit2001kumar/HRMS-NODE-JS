const express = require('express')
const router = express.Router()
const companyholidaysController = require('../controllers/companyholidays.controller');

// Retrieve all leaves
router.get('/getAll', companyholidaysController.findAll);

// Create a new leaves
router.post('/companyHoliday', companyholidaysController.companyHoliday);

// Retrieve a single leave with id
router.get('/:HolidayId', companyholidaysController.findById);

// Update a applyleaves with id
router.put('/:HolidayId', companyholidaysController.update);

// Delete a leave with id
router.delete('/:HolidayId', companyholidaysController.delete);

module.exports = router;