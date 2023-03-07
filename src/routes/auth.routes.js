const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller');
// var config = require('./../../config/.env');

const mysql = require("mysql");
// const doenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

const app = express();

// doenv.config({
//   path: config,
// });

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//console.log(__dirname);
const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "ejs");

// Retrieve all employees
router.get('/getAll', authController.findAll);

// Retrieve a single employee with id
router.get('/:id', authController.findById);

// Update a employee with id
router.put('/:id', authController.update);

// Delete a employee with id
router.delete('/:id', authController.delete);

router.post('/register', authController.register);
//router.post('/login', authController.login);
//router.get('/logout', authController.logout);


module.exports = router