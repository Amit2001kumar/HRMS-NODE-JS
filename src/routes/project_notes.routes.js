const express = require('express')
const router = express.Router()
const notesController = require('../controllers/project_notes.controller');

// Retrieve all Notes
router.get('/getAll', notesController.findAll);

// Create a new Notes
router.post('/create', notesController.create);

// Retrieve a single Notes with id
// router.get('/:id', notesController.findById);

// Retrieve a single Notes with project_name
router.get('/:project_name', notesController.findById);
// Update a Notes with id
router.put('/:id', notesController.update);

// Delete a Note with id
router.delete('/:id', notesController.delete);

module.exports = router