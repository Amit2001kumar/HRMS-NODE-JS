const express = require('express')
const router = express.Router()
const addscheduleController = require('../controllers/addschedule.controller');


router.get('/getAll', addscheduleController.findAll);


router.post('/add', addscheduleController.add);


router.get('/:AddScheduleId', addscheduleController.findById);


router.put('/:AddScheduleId', addscheduleController.update);


router.delete('/:AddScheduleId', addscheduleController.delete);

// Retrieve a single leave with id and name
router.post('/findBySearch', addscheduleController.findBySearch);

//get  by search
router.post('/findAllSearch', addscheduleController.findAllSearch);

module.exports = router;

