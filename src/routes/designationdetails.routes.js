const express = require('express')
const router = express.Router()
const designationdetailsController = require('../controllers/designationdetails.controller');

// Retrieve all leaves
router.get('/getAll', designationdetailsController.findAll);

// Create a new leaves
router.post('/designation', designationdetailsController.designation);

// Retrieve a single leave with id
router.get('/:DesignationDetailsID', designationdetailsController.findById);

// Update a applyleaves with id
// router.put('/:ApplyLeaveId', designationdetailsController.update);

// Delete a leave with id
router.delete('/:DesignationDetailsID', designationdetailsController.delete);

module.exports = router;

// const express = require('express');

// const designationdetailsController = require('../controllers/tbl_designationdetails');

// const router = express.Router();

// // CREATE - POST
// router.post('/', designationdetailsController.createNewUser);

// // READ - GET
// router.get('/', designationdetailsController.getAllUsers);


// router.get('/:DesignationDetailsID', designationdetailsController.getbyid);




// UPDATE - PATCH
// router.patch('/:idUser', designationdetailsController.updateUser);

// // DELETE - DELETE
// router.delete('/:idUser', designationdetailsController.deleteUser);



// module.exports = router;