const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('../login controllers/company-mailing-credentials/companyRegisterController');
const getAllcredentials = require('../login controllers/company-mailing-credentials/mailingCredentials.getAll');
router.post('/regMailingCredentials',register);

router.get('/companyMailing/getAll',getAllcredentials.getall);



module.exports = router;
