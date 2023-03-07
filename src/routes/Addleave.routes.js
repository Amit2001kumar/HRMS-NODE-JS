const express = require('express')
const router = express.Router()
const addleavesController = require('../controllers/Addleave.controller');

// Retrieve all leaves
router.get('/getAll', addleavesController.findAll);

// Create a new leaves
router.post('/add', addleavesController.add);

// Retrieve a single leave with id
router.get('/:AddLeaveId', addleavesController.findById);

// Update a applyleaves with id
router.put('/:AddLeaveId', addleavesController.update);

// Delete a leave with id
router.delete('/:AddLeaveId', addleavesController.delete);

module.exports = router;