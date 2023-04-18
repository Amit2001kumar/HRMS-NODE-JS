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
router.delete('/del/:AddExitDetailsId', AddExitDetailsController.delete);


// Retrieve a single leave with id and name
router.post('/findByEmpIdName', AddExitDetailsController.findByEmpIdName);

//get  by search
router.post('/findAllSearch', AddExitDetailsController.findAllSearch);

module.exports = router;
