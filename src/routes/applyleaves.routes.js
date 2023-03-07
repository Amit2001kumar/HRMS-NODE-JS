const express = require('express')
const router = express.Router()
const applyleavesController = require('../controllers/applyleaves.controller');

// Retrieve all leaves
router.get('/getAll', applyleavesController.findAll);

// Create a new leaves
router.post('/apply', applyleavesController.apply);

// get leaves day 
router.get('/day', applyleavesController.Totalleave);

// Retrieve a single leave with id
router.get('/:employee_id', applyleavesController.findById);

// Update a applyleaves with id
router.put('/:employee_id', applyleavesController.update);

// Delete a leave with id
router.delete('/:employee_id', applyleavesController.delete);

module.exports = router;
