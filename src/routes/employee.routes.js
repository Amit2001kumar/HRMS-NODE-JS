const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employee.controller');

// Retrieve all employees
router.get('/getAll', employeeController.findAll);

// Create a new employee
router.post('/create', employeeController.create);

// Retrieve a single employee with email
router.get('/:email', employeeController.findById);

// Update a employee with id
router.put('/:email', employeeController.update);

// Delete a employee with id
router.delete('/:email', employeeController.delete);

module.exports = router
