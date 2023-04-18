const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('../login controllers/onboarding/onboarding_registerController');
const {login} = require('../login controllers/onboarding/onboarding_loginController');
const getAllOnboardingUsers = require('../login controllers/onboarding/onboarding.getAll');
router.post('/employee_reg_onboarding',register);

router.get('/getAllJoiners',getAllOnboardingUsers.getall);

router.get('/getbyid/:id',getAllOnboardingUsers.getbyid);

router.get('/getbycmpnyid/:company_id',getAllOnboardingUsers.getbycmpnyid);

router.post('/getAllsearch',getAllOnboardingUsers.getallsearch);

router.delete('/del/:id',getAllOnboardingUsers.delete);

router.put('/edit/:id',getAllOnboardingUsers.update);

router.put('/:company_email_id',getAllOnboardingUsers.updateDetails);

router.put('/email/:company_email_id',getAllOnboardingUsers.updatebyemail);

// router.put('/:company_email_id/:company_id ',getAllOnboardingUsers.updatebycmpnyid);



router.post('/employee_login',[
  body('company_email_id',"Invalid email address")
  .notEmpty()
  .escape()
  .trim().isEmail(),
  body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);



module.exports = router;
