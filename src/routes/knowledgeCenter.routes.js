const express = require("express"),
  path = require("path"),
  app = express(),
  multer = require("multer"),
  bodyParser = require("body-parser");
const router = express.Router();
var dbConn = require("../../config/db.config");
const KnowledgeCenterController = require("../controllers/KnowledgeCenter.controller");

const DIR = "./src/uploads";

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  Documentname: function (req, file, cb) {
    cb(
      null,
       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
       

    );
  },
});
let upload = multer({ storage: storage, limits: { fileSize: 52428800 } });
// all environments

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// upload document
router.post("/Knowledge", upload.single("profile"), function (req, res) {
  message: "Error! in image upload.";
  if (!req.file) {
    console.log("No file received");
    message = "Error! in image upload.";
    res.render("index", { message: message, status: "error" });
  } else {
    console.log("file received");
    console.log(req);
    var sql =
      "INSERT INTO `KnowledgeCenter` (`Title`, `Link`, `Documentname`, `AddDescription`) VALUES ('" +
      
      req.body.Title +
      "', '" +
      req.body.Link +
      "', '" +
      req.file.originalname +
      "', '" +
      req.body.AddDescription +
      "' )";
    dbConn.query(sql, function (err, result) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res);
        //  result(null, res.insertId);
        message = "Attachment Successfully! uploaded";
        res.json({error:false, message: message, status: "success",data:result.insertId });
       
      }
      //    console.log('inserted data');
    });

    //res.render('index',{message: message, status:'success'});
  }
});

message = "";
router.get("/", function (req, res) {
  res.render("index.ejs", message);
});
// router.get("/download", attachmentController.download);
//router.get("/download/:file(*)", attachmentController.download);

// Delete a document with orignalname
router.delete("/:KnowledgeCenterid", KnowledgeCenterController.delete);

router.get('/getAll', KnowledgeCenterController.findAll);

// Retrieve a single Documents with email
router.get('/:KnowledgeCenterid', KnowledgeCenterController.findById);

router.post('/download', function(req,res,next){
  var file = req.body.filename;
  var fileLocation = path.join(__dirname,'../uploads')+'/'+file;
  console.log(fileLocation);
  res.sendFile(fileLocation);
 
});

module.exports = router;
