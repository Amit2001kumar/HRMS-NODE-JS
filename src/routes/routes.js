const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('../login controllers/registerController.js');
const {login} = require('../login controllers/loginController.js');
// const {getUser} = require('./controllers/getUserController');
const {getUserName} = require('../login controllers/getcontroller.js')
//const{getAllUser}=require('../login controllers/')
router.post('/InviteUser', 
[
  body('FirstName',"The name must be of minimum 3 characters length")
  .notEmpty()
  .escape()
  .trim()
  .isLength({ min: 3 }),
  
  body('LastName',"The name must be of minimum 3 characters length")
  .notEmpty()
  .escape()
  .trim()
  .isLength({ min: 3 }),
  body('Email',"Invalid email address")
  .notEmpty()
  .escape()
  .trim().isEmail(),
  
  
  body("Password", "The Password must be of minimum 4 characters length")
     .notEmpty()
       .trim()
    .isLength({ min: 4 }),
 
],
 register);



router.post('/login',[
  body('Email',"Invalid email address")
  .notEmpty()
  .escape()
  .trim().isEmail(),
  body('Password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);

 router.get('/getoneuser/:Email',getUserName);
// router.get('/getoneuser',getUserName);

// router.get('/getuser',getUser)
// router.get('/getall',getAllUser)

module.exports = router;
