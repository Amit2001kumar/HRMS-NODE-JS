const express = require('express')
const router = express.Router()
const designationController = require('../controllers/designation.controller');

// Retrieve all designation details 
router.get('/getAll', designationController.findAll);

// Create a new designation
router.post('/add', designationController.create);

// Retrieve a single designation with id
router.get('/:id', designationController.findById);

// Update a designation with id
router.put('/:id', designationController.update);

// Delete a designation with id
router.delete('/:id', designationController.delete);

module.exports = router