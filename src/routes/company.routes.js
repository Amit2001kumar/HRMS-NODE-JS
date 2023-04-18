const express = require('express')
const router = express.Router()
const companyController = require('../controllers/company.controller');

// Retrieve all companys
router.get('/getAll', companyController.findAll);

// Create a new companys
router.post('/add', companyController.create);

router.get('/dm/:company_domain', companyController.findByDomain);


// Retrieve a single company with id
router.get('/:company_id', companyController.findById);


// Retrieve a  company with search result
router.post('/search', companyController.findBySearch);

// Update a company with id
router.put('/:company_id', companyController.update);

// Delete a company with id
router.delete('/:company_id', companyController.delete);

module.exports = router
