const express = require('express')
const router = express.Router()
const AddholidaysController = require('../controllers/AddHoliday.controller');

// Retrieve all leaves
router.get('/getAll', AddholidaysController.findAll);

// Create a new leaves
router.post('/add', AddholidaysController.add);

// Retrieve a single leave with id
router.get('/:HolidayId', AddholidaysController.findById);

// Update a applyleaves with id
router.put('/:HolidayId', AddholidaysController.update);

// Delete a leave with id
router.delete('/:HolidayId', AddholidaysController.delete);

module.exports = router;