const express = require('express')
const router = express.Router()
const CandidatedetailController = require('../controllers/Candidatedetail.controller');

// Retrieve all employees
router.get('/getAll', CandidatedetailController.findAll);

// Retrieve a single employee with id
router.get('/:email', CandidatedetailController.findById);
router.get('/education/:email', CandidatedetailController.findById_Education); //
router.get('/experience/:email', CandidatedetailController.findById_Experience); //
router.get('/address/:email',CandidatedetailController.findById2);
module.exports = router
