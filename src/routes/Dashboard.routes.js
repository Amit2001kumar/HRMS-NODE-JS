const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/Dashboard.controller');

// // Retrieve all dashboard details
 router.get('/birthday', dashboardController.birthday); 

 router.get('/leaves', dashboardController.leaves);

router.get('/newHire', dashboardController.newHire);

router.get('/approvalForRequests/:EmployeeId', dashboardController.approvalForRequests);

router.get('/upcomingHolidays', dashboardController.upcomingHolidays);





module.exports = router;
