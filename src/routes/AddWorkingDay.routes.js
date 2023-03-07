const express = require('express')
const router = express.Router()
const addworkingdayController = require('../controllers/AddWorkingDay.controller');

// Retrieve all addworkingday
router.get('/getAll', addworkingdayController.findAll);

// Create a new addworkingday
router.post('/workingday', addworkingdayController.add);

// Retrieve a single addworkingday with id
router.get('/:id', addworkingdayController.findById);

// Update a applyaddworkingday with id
router.put('/:id', addworkingdayController.update);

// Delete a addworkingday with id
router.delete('/:id', addworkingdayController.delete);

module.exports = router;