const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project.controller');

// Retrieve all projects
router.get('/getAll', projectController.findAll);

// Create a new projects
router.post('/create', projectController.create);

// Delete a project with id
router.delete('/:project_name', projectController.delete);

// // Update a project with id
// router.put('/:id', projectController.update);

// Update a project with project_name
router.put('/:project_name', projectController.update);

// Retrieve a  project with search result
router.post('/search', projectController.findBySearch);

// Retrieve a  project with Multi search result
router.post('/multisearch', projectController.findByMultiSearch);

// Retrieve a single project with id
// router.get('/:id', projectController.findById);
router.get('/:project_name', projectController.findById);




module.exports = router;
