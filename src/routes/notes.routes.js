const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notes.controller');

// Retrieve all Notes
router.get('/getAll', notesController.findAll);

// Create a new Notes
router.post('/create', notesController.create);

// Retrieve a single Notes with id
// router.get('/:id', notesController.findById);

// Retrieve a single Notes with email
router.get('/:email', notesController.findById);
// Update a Notes with id
router.put('/:id', notesController.update);

// Delete a Note with id
router.delete('/:id', notesController.delete);

module.exports = router