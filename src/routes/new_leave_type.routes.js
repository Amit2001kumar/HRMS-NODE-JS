const express = require('express')
const router = express.Router()
const leaveController = require('../controllers/new_leave_type.controller');



// Create a new leaves
router.post('/create', leaveController.create);

// Update a applyleaves with ApplyLeaveId
router.put('/:id', leaveController.update);

// Delete a document with orignalname
router.delete("/:id", leaveController.delete);

router.get('/getAll', leaveController.findAll);

// Retrieve a single Documents with project_name
router.get('/:id', leaveController.findById);


// const express = require("express"),
//   path = require("path"),
//   app = express(),
//   multer = require("multer"),
//   bodyParser = require("body-parser");
// const router = express.Router();
// var dbConn = require("./../../config/db.config");
// const leaveController = require("../controllers/new_leave_type.controller");

// const DIR = "./src/uploads";

// let storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, DIR);
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       // file.fieldname + "-" + Date.now() + path.extname(file.originalname)

//       file.originalname

//     );
//   },
// });
// let upload = multer({ storage: storage, limits: { fileSize: 52428800 } });
// // all environments

// app.set("views", __dirname + "/views");
// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public")));

// // upload document
// router.post("/leave", upload.single("profile"), function (req, res) {
//   message: "Error! in image upload.";
//   // if (!req.file) {
//   //   console.log("No file received");
//   //   message = "Error! in image upload.";
//   //   res.render("index", { message: message, status: "error" });
//   // } else {
//     console.log("file received");
//     console.log(req);
//     var sql =
//       "INSERT INTO `new_leaves_type` (`name`, `type`, `code`,`unit`, `balance`, `date_from`,`date_to`, `reason_for_leave`, `size`, `path`, `originalname`) VALUES ('" +
//       req.body.name +
//       "', '" +
//       req.body.type +
//       "', '" +
//       req.body.code +
//       "', '" +
//       req.body.unit +
//       "', '" +
//       req.body.balance +
//       "', '" +
//       req.body.date_from +
//       "', '" +
//       req.body.date_to +
//       "', '" +
//       req.body.reason_for_leave +
//       "', '" +
//       req.file.size +
//       "', '" +
//       req.file.path +
//       "', '" +
//       req.file.originalname +
//       "'  )";
//     dbConn.query(sql, function (err, result) {
//       if (err) {
//         console.log("error: ", err);
//         // result(err, null);
//       } else {
//         console.log(res);
//         //  result(null, res.insertId);
//         message = "New Leave Type Successfully Inserted! uploaded";
//         res.json({ error: false, message: message, status: "success", data: result.insertId });

//       }
//       //    console.log('inserted data');
//     });

//     //res.render('index',{message: message, status:'success'});
//   // }
// });

// message = "";
// router.get("/", function (req, res) {
//   res.render("index.ejs", message);
// });
// // router.get("/download", leaveController.download);
// //router.get("/download/:file(*)", leaveController.download);

// // Delete a document with orignalname
// router.delete("/:id", leaveController.delete);

// router.get('/getAll', leaveController.findAll);

// // Retrieve a single Documents with project_name
// router.get('/:id', leaveController.findById);

// router.post('/download', function (req, res, next) {
//   var file = req.body.filename;
//   console.log("hiii", req.body.filename, path.join(__dirname, '../uploads') + '/' + '10th.jpg');
//   var fileLocation = path.join(__dirname, '../uploads') + '/' + file;
//   console.log(fileLocation);
//   res.sendFile(fileLocation);

// });

module.exports = router;
