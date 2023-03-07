const express = require('express')
const router = express.Router()
const addscheduleController = require('../controllers/addschedule.controller');


router.get('/getAll', addscheduleController.findAll);


router.post('/add', addscheduleController.add);


router.get('/:AddScheduleId', addscheduleController.findById);


router.put('/:AddScheduleId', addscheduleController.update);


router.delete('/:AddScheduleId', addscheduleController.delete);

module.exports = router;

