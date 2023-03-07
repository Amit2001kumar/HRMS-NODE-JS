const express = require('express')
const router = express.Router()
const AddExitDetailsController = require('../controllers/AddExitDetails.controller');

// Retrieve all leaves
router.get('/getAll', AddExitDetailsController.findAll);

// Create a new leaves
router.post('/AddExit', AddExitDetailsController.add);

// Retrieve a single leave with id
router.get('/:Employee_id', AddExitDetailsController.findById);

// Update a applyleaves with id
router.put('/:Employee_id', AddExitDetailsController.update);

// Delete a leave with id
router.delete('/:Employee_id', AddExitDetailsController.delete);

module.exports = router;