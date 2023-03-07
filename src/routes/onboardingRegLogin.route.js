const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('../login controllers/onboarding/onboarding_registerController');
const {login} = require('../login controllers/onboarding/onboarding_loginController');
const getAllOnboardingUsers = require('../login controllers/onboarding/onboarding.getAll');
router.post('/employee_reg_onboarding',register);

router.get('/getAllJoiners',getAllOnboardingUsers.getall);

router.post('/getAllsearch',getAllOnboardingUsers.getallsearch);

router.delete('/del/:id',getAllOnboardingUsers.delete);

router.put('/edit/:id',getAllOnboardingUsers.update);


router.post('/employee_login',[
  body('company_email_id',"Invalid email address")
  .notEmpty()
  .escape()
  .trim().isEmail(),
  body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);



module.exports = router;
