const dbConn = require('./../../../config/db.config')


const external_work = require('../../models/external_work.model')



exports.getall = (req, res) => {
  dbConn.query('SELECT * FROM onboarding_credentials', (err, rows, fields) => {
    if (!err) {
      res.json({
        message: "fetched successfully",
        data: rows,
        error: false
      })
    }
    else {
      res.send(err);
      console.log("candidate not exist");
    }
  })
};


exports.getbyid = function (req, res) {
  external_work.getbyid(req.params.id, function (err, rows) {
    if (err)
      res.send(err);
    res.json({ error: false,  data: rows[0],message: 'USER successfully fetched' });
  });
};


exports.getbycmpnyid = function (req, res) {
  external_work.getbycmpnyid(req.params.company_id, function (err, rows) {
    if (err)
      res.send(err);
    res.json({ error: false,  data: rows[0],message: 'USER successfully fetched' });
  });
};



exports.getallsearch = function(req, res) {
  external_work.getallsearch(req.body, function(err, emp) {
      if (err)
      res.send(err);
      res.json(emp);
  });
};


exports.delete = function (req, res) {
  external_work.delete(req.params.id, function (err, employee) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Employee successfully deleted' });
  });
};


exports.update = function (req, res) {

  console.log("req.body",req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    external_work.update(req.params.id, new external_work(req.body), function (err, credentials) {
      if (err)
        res.send(err);
      res.json({ credentials: credentials, error: false, message: 'Company Email id successfully updated' });
    });
  }

};



// exports.updatebycmpnyid = function (req, res) {
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res.status(400).send({ error: true, message: 'Please provide all required field' });
//   } else {
//     external_work.update(req.params.company_email_id,req.params.company_id, new external_work(req.body), function (err, credentials) {
//       if (err)
//         res.send(err);
//       res.json({ credentials: credentials, error: false, message: 'Users details successfully updated' });
//     });
//   }

// };


exports.updateDetails = function (req, res) {
  external_work.updateDetails(req.params.company_email_id,req.body, function (err) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Company id added successfully ' });
  });
};


exports.updatebyemail = function (req, res) {
  external_work.updatebyemail(req.params.company_email_id,req.body, function (err) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'password updated successfully'});
  });
};
