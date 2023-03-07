const express = require('express')
const router = express.Router()
const departmentdetailsController = require('../controllers/departmentdetails.controller');

// Retrieve all leaves
router.get('/getAll', departmentdetailsController.findAll);

// Create a new leaves
router.post('/apply', departmentdetailsController.apply);

// Retrieve a single leave with id
router.get('/:departmentId', departmentdetailsController.findById);

// Update a departmentdetails with id
router.put('/:departmentId', departmentdetailsController.update);

// Delete a leave with id
router.delete('/:departmentId', departmentdetailsController.delete);

module.exports = router;