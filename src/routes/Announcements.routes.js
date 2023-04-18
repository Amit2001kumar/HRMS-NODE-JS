const express = require('express')
const router = express.Router()
const AnnouncementsController = require('../controllers/Announcements.controller');

// Retrieve all leaves
router.get('/getAll/:company_id', AnnouncementsController.findAll);

// Create a new leaves
router.post('/apply', AnnouncementsController.apply);

// Retrieve a single leave with id
router.get('/:Announcementsid', AnnouncementsController.findById);

// Update a applyleaves with id
router.put('/:Announcementsid', AnnouncementsController.update);

// Delete a leave with id
router.delete('/:Announcementsid', AnnouncementsController.delete);

module.exports = router;
