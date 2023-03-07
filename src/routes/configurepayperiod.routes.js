const express = require('express')
const router = express.Router()
const configurepayperiodController = require('../controllers/configurepayperiod.controller');

// Retrieve all leaves
router.get('/getAll', configurepayperiodController.findAll);

// Create a new leaves
router.post('/configure', configurepayperiodController.configure);

// Retrieve a single leave with id
router.get('/:ConfigurePayPeriodID', configurepayperiodController.findById);

// Update a applyleaves with id
router.put('/:ConfigurePayPeriodID', configurepayperiodController.update);

// Delete a leave with id
router.delete('/:ConfigurePayPeriodID', configurepayperiodController.delete);

module.exports = router;



// const express = require('express');

// const tbl_configurepayperiodController = require('../controllers/configurepayperiod.controller');

// const router = express.Router();

// // CREATE - POST
// router.post('/', tbl_configurepayperiodController.createNewUser);

// // READ - GET
// router.get('/', tbl_configurepayperiodController.getAllUsers);


// // READ - GET BY ID
// router.get('/:ConfigurePayPeriodID', tbl_configurepayperiodController.getbyid);




// // UPDATE - PATCH
// // router.patch('/:idUser', UserController.updateUser);

// // // DELETE - DELETE
// // router.delete('/:idUser', UserController.deleteUser);



// module.exports = router;