const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employee.controller');

// Retrieve all employees
router.get('/getAll/:company_id', employeeController.findAll);

// Create a new employee
router.post('/create', employeeController.create);

// Retrieve a single employee with email
router.get('/:email', employeeController.findById);

// Update a employee with id
router.put('/:email', employeeController.update);

// Delete a employee with id
router.delete('/:email', employeeController.delete);


// Update a employee with email
router.put('/empId/:email', employeeController.updateAfterPreonBoarding);

// Retrieve a single employee with employee id
router.post('/employee_id', employeeController.findEmployeeByEmployeeId);


router.post('/employee_idAndName', employeeController.SearchEmployeeByEmployeeIdAndName);


router.post('/SearchAllemployee_idAndName', employeeController.SearchAllEmployeeByEmployeeIdAndName);


module.exports = router
