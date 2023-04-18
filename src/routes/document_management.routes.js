const express = require('express')
const router = express.Router()
const documentmanagementController = require('../controllers/document_management.controller');

// Retrieve all leaves
router.get('/getAll', documentmanagementController.findAll);

// Create a new leaves
router.post('/apply', documentmanagementController.apply);

// Retrieve a single leave with id
router.get('/:documenttype', documentmanagementController.findById);

// Update a applyleaves with id
router.put('/:documentid', documentmanagementController.update);

// Delete a leave with id
router.delete('/:documentid', documentmanagementController.delete);



router.get('/:documentname ,module', documentmanagementController.documentname);


router.get('/module/:module', documentmanagementController.module);


// Retrieve a  document with search result
router.post('/search', documentmanagementController.findBySearch);

module.exports = router;
