const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/Dashboard.controller');

// // Retrieve all dashboard details
 router.get('/birthday/:company_id', dashboardController.birthday); 

 router.get('/leaves/:company_id', dashboardController.leaves);

router.get('/newHire/:company_id', dashboardController.newHire);

router.get('/approvalForRequests/:EmployeeId/:company_id', dashboardController.approvalForRequests);

router.get('/upcomingHolidays/:company_id', dashboardController.upcomingHolidays);





module.exports = router;
