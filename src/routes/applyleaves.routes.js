const express = require('express')
const router = express.Router()
const applyleavesController = require('../controllers/applyleaves.controller');

// Retrieve all leaves
router.get('/getAll/:company_id', applyleavesController.findAll);

// Create a new leaves
router.post('/apply', applyleavesController.apply);

// get leaves day 
router.get('/day', applyleavesController.Totalleave);

// Retrieve a single leave with employee_id
router.get('/:employee_id/:company_id', applyleavesController.findById_emp);

// Retrieve a single leave with ApplyLeaveId
router.get('/:ApplyLeaveId', applyleavesController.findById);

// Update a applyleaves with ApplyLeaveId
router.put('/:ApplyLeaveId', applyleavesController.update);

// Delete a leave with id
router.delete('/:ApplyLeaveId', applyleavesController.delete);




// Update a applyleaves with id
router.put('/updateById/:employee_id/:ApplyLeaveId', applyleavesController.updateBY);

//get
router.get('/findByAction/:employee_id/:Action', applyleavesController.findBy);

router.get('/findAllByAction/:Action', applyleavesController.findAllByAction);

// Retrieve a single leave with search
router.post('/leave_type', applyleavesController.findBySearch);

// Retrieve a single leave with search and id
router.post('/leave_type/id', applyleavesController.findBySearchID);

//get  by search
router.post('/findAll', applyleavesController.applyfindAllSearch);

router.post('/searchAll', applyleavesController.applySearchAll);


module.exports = router;
