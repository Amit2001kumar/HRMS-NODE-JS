const express = require('express')
const router = express.Router()
const branchlocationdetailsController = require('../controllers/branchlocationdetails.controller');

// Retrieve all leaves
router.get('/getAll', branchlocationdetailsController.findAll);

// Create a new leaves
router.post('/apply', branchlocationdetailsController.apply);

// Retrieve a single leave with id
router.get('/:Location_id', branchlocationdetailsController.findById);

// Update a applyleaves with id
router.put('/:Location_id', branchlocationdetailsController.update);

// Delete a leave with id
router.delete('/:Location_id', branchlocationdetailsController.delete);

module.exports = router;