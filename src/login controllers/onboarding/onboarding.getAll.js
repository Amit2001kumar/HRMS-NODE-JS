const dbConn = require('./../../../config/db.config')


const external_work = require('../../models/external_work.model')



exports.getall = (req, res) => {
  dbConn.query('SELECT * FROM onboarding_credentials ', (err, rows, fields) => {
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
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    external_work.update(req.params.id, new external_work(req.body), function (err, credentials) {
      if (err)
        res.send(err);
      res.json({ credentials: credentials, error: false, message: 'Timesheet successfully updated' });
    });
  }

};
