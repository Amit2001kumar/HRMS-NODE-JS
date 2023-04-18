const express = require('express');
const multer = require("multer");
const bodyParser = require('body-parser');
// const doenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const dbConn = require("./config/db.config");

require("dotenv").config();

const nodemailer = require("nodemailer");


const routes = require('./src/routes/routes');
const routes1 = require('./src/routes/onboardingRegLogin.route');

const routes3=require('./src/routes/CompanyMailing.routes')

// create express app
const app = express();
app.set('view engine', 'ejs');



// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))




// parse requests of content-type - application/json
app.use(bodyParser.json())
// const Pending_report = require('./src/routes/PendingReport.routes')














// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Require employee routes
const employeeRoutes = require('./src/routes/employee.routes');

const attachmentRoutes = require('./src/routes/attachment.routes');

const noteRoutes = require('./src/routes/notes.routes');

const applyLeaveRoutes = require('./src/routes/applyleaves.routes');

const companyholidaysRoutes = require('./src/routes/companyholidays.routes');

const authRoutes = require('./src/routes/auth.routes');

const designationdetailsRoutes = require('./src/routes/designationdetails.routes');

const customizebalanceRoutes = require('./src/routes/customizebalance.routes');

const configurepayperiodRoutes = require('./src/routes/configurepayperiod.routes');

const addscheduleRoutes = require('./src/routes/addschedule.routes');

const AddExitDetailsRoutes = require('./src/routes/AddExitDetails.routes');

const addleaveRoutes = require('./src/routes/Addleave.routes');

const PendingReportRoutes = require('./src/routes/PendingReport.routes');

const CandidatedetailControllerRoutes = require('./src/routes/Candidatedetail.routes');

const AddHolidayControllerRoutes = require('./src/routes/AddHoliday.routes');

const TimesheetRoutes = require('./src/routes/Timesheet.routes');

const projectRoutes = require('./src/routes/project.routes');

const knowledgeCenterRoutes = require('./src/routes/knowledgeCenter.routes');

const announcementsRoutes = require('./src/routes/Announcements.routes');

const dashboardRoutes=require('./src/routes/Dashboard.routes');

const AddWorkingDayRoutes = require('./src/routes/AddWorkingDay.routes');

// const documentmanagementRoutes = require('./src/routes/document_management.routes');

const departmentdetailsRoutes = require('./src/routes/departmentdetails.routes');

const designationRoutes = require('./src/routes/designation.routes');

const branchlocationdetailsRoutes = require('./src/routes/branchlocationdetails.routes');

const documentmanagementRoutes = require('./src/routes/document_management.routes');

const projectAttachmentRoutes = require('./src/routes/project.attachment.routes');

const projectNotesRoutes = require('./src/routes/project_notes.routes');

const timesheetAttachmentRoutes = require('./src/routes/timesheet.attachment.routes');

const timesheetNotesRoutes = require('./src/routes/timesheet_notes.routes');

const applyleavesAttachmentRoutes = require('./src/routes/applyleaveAttach.routes');

const applyleavesNotesRoutes = require('./src/routes/applyleaveNote.routes');

const companyRoutes = require('./src/routes/company.routes');

const NewLeaveTypeRoutes = require('./src/routes/new_leave_type.routes');


//////////////////////

// app.use('/tbl_employee_info', tbl_employee_infoRoutes);


// app.use('/api/leave_status', Pending_report);
//////////////////////////////////


// using as middleware
app.use('/api/v1/employees', employeeRoutes);

app.use('/api/v1/project', projectRoutes);

app.use('/api/v1/file', attachmentRoutes);

app.use('/api/v1/notes', noteRoutes);

app.use('/api/v1/leaves', applyLeaveRoutes);

app.use('/api/v1/companyHoliday', companyholidaysRoutes);

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/detail', designationdetailsRoutes);

app.use('/api/v1/balance', customizebalanceRoutes);

app.use('/api/v1/period', configurepayperiodRoutes);

app.use('/api/v1/schedule', addscheduleRoutes);

app.use('/api/v1/AddExitDetails', AddExitDetailsRoutes);

app.use('/api/v1/leave', addleaveRoutes);

app.use('/api/v1/Pending', PendingReportRoutes);

app.use('/api/v1/Candidate', CandidatedetailControllerRoutes);

app.use('/api/v1/AddHoliday', AddHolidayControllerRoutes);

app.use('/api/v1/Timesheet', TimesheetRoutes);

app.use('/api/v1/knowledgeCenter', knowledgeCenterRoutes);

app.use('/api/v1/announcement', announcementsRoutes);

app.use('/api/v1/dashboard',dashboardRoutes);

app.use('/api/v1/AddWorkingDay', AddWorkingDayRoutes);

// app.use('/api/v1/documentmanagement', documentmanagementRoutes);

app.use('/api/v1/departmentdetails', departmentdetailsRoutes);

app.use('/api/v1/designation', designationRoutes); 

app.use('/api/v1/branchlocation', branchlocationdetailsRoutes);

app.use('/api/v1/documentmanagement', documentmanagementRoutes);

app.use('/api/v1/projectfile', projectAttachmentRoutes);

app.use('/api/v1/projectnote', projectNotesRoutes);

app.use('/api/v1/timesheetfile', timesheetAttachmentRoutes);

app.use('/api/v1/timesheetnote', timesheetNotesRoutes);

app.use('/api/v1/leavefile', applyleavesAttachmentRoutes);

app.use('/api/v1/leavenote', applyleavesNotesRoutes);

app.use('/api/v1/company', companyRoutes);

app.use('/api/v1/newleavetype', NewLeaveTypeRoutes);




app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});
app.use(routes);
app.use('/api/v1',routes1);
// listen for requests
app.use('/api/v1',routes3);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
  next();
});



////////////////////////contact-us////////////////////////////////



app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/send_email", function (req, response) {
  var guser = "mohitbhiranimohit@gmail.com";
  var from = guser;

  console.log(req.body);
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohitbhiranimohit@gmail.com",
      pass: "yixhunqgerjzpnyz",
    },
  });
  const body = req.body;
  const bdyPrty = [body.Email, body.Message];
  var getQry =
    "INSERT INTO hrms.tbl_contactus (Email,Message) VALUES(?)";
  dbConn.query(getQry, [bdyPrty], (err, result) => {
    // if (err) {
    //   throw err;
    // } else {
    //   console.log(" addded succesfully");

    //   res.send({
    //     message: "check users list",
    //   });
    // }

    const { to, subject, text } = req.body;
    var mailOptions = {
      from: "mohitbhiranimohit@gmail.com",
      to: to,
      subject: subject,
      text: `<${body.Email}> \n${body.Message}`,
    };

    transport.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("mail has sent.");
      }
      res.send(info);
    });
  });
});

app.get("/", (req, resp) => {
  var getQry = "SELECT * FROM tbl_contactus";
  dbConn.query(getQry, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log("database connected");
      resp.send({
        message: "check users list",
        data: result,
      });
    }
  });
});

app.post("/contact", async (req, res, next) => {
  const body = req.body;
  const bdyPrty = [body.CompanyID, body.Email, body.Message];
  var getQry =
    "INSERT INTO hrms.tbl_contactus (Email,Message) VALUES(?)";
  dbConn.query(getQry, [bdyPrty], (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(" addded succesfully");

      res.send({
        message: "check users list",
      });
    }
  });
});


// new hire.........
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `image-${Date.now()}` + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage });
app.use("/api/v1/newhire", express.static("./src/uploads"));
app.get("/api/v1/newhire", upload.single("image"), (req, resp) => {
  var getQry = "call GetNewHireDetails()";
  
  dbConn.query(getQry, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log("database connected", result);

//       resp.send({
//         result

//       });
      
       resp.send(
        result[0]

      );
      
    }
  });
});
app.post("/api/v1/newhire/add", upload.single("image"), (req, resp) => {
  const body = req.body;
  const file = req.file;
  const bdyPrty = [
    body.CompanyID,
    body.name,
    body.email,
    body.joiningDate,
    body.designation,
    file.filename,
  ];
  var getQry =
    "INSERT INTO hrms.tbl_new_hire(CompanyID, name, email, joiningDate, designation,image) VALUES(?)";
  dbConn.query(getQry, [bdyPrty], (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(" addded succesfully");
      resp.send({
        message: "check users list",
      });
    }
  });
});


//profilepic change///////////////////////////////


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/profile');
  },
  filename: function (req, file, cb) {
    cb(null, `image-${Date.now()}` + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage });
app.use("/api/v1/profile", express.static("./src/profile"));
app.get("/api/v1/profile", upload.single("image"), (req, resp) => {
  var getQry = "SELECT * FROM profilepic";
  
  dbConn.query(getQry, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log("database connected", result);

      resp.send({
        result

      });
    }
  });
});
app.post("/api/v1/profile", upload.single("image"), (req, resp) => {
  const body = req.body;
  const file = req.file;
  const bdyPrty = [
    body.CompanyID,
    body.Employee_id,

    file.filename,
  ];
  var getQry =
    "INSERT INTO profilepic(CompanyID,Employee_id,image ) VALUES(?)";
  dbConn.query(getQry, [bdyPrty], (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(" addded succesfully");
      resp.send({
        message: "check users list",
      });
    }
  });
});

app.get('/api/v1/profile/:Employee_id',(req,res)=>{
  dbConn.query('Select * FROM profilepic WHERE Employee_id=?',[req.params.Employee_id],(err,rows)=>{
      if(err){
          console.log(err)
      }
      else{
          //console.log(rows)
          res.send(rows)
      }
  })
})

app.delete('/api/v1/profile/:Employee_id',(req,res)=>{
  dbConn.query('DELETE * FROM profilepic WHERE Employee_id=?',[req.params.Employee_id],(err,rows)=>{
      if(err){
          console.log(err)
      }
      else{
          //console.log(rows)
          res.send(rows)
      }
  })
})




app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
