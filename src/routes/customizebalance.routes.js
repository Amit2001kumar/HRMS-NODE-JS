const express = require('express')
const router = express.Router()
const customizebalanceController = require('../controllers/customizebalance.controller');

// Retrieve all leaves
router.get('/getAll', customizebalanceController.findAll);

// Create a new leaves
router.post('/customize', customizebalanceController.customize);

// Retrieve a single leave with id
router.get('/:CustomizeBalanceID', customizebalanceController.findById);

// Update a applyleaves with id
router.put('/:CustomizeBalanceID', customizebalanceController.update);

// Delete a leave with id
router.delete('/:CustomizeBalanceID', customizebalanceController.delete);

module.exports = router;





// const express = require('express');

// const customizebalanceController = require('../controllers/customizebalance.controller');

// const router = express.Router();

// // CREATE - POST
// router.post('/', customizebalanceController.createNewUser);

// // READ - GET
// router.get('/', customizebalanceController.getAllUsers);

// // UPDATE - PATCH
// router.patch('/:i', customizebalanceController.updateUser);

// // DELETE - DELETE
// router.delete('/:CustomizeBalanceID', customizebalanceController.deleteUser);

// router.get('/:CustomizeBalanceID', customizebalanceController.getbyid);






// module.exports = router;