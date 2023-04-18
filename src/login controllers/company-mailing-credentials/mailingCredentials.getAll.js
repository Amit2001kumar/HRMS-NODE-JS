const dbConn = require('./../../../config/db.config')

exports.getall = (req, res) => {
  dbConn.query('SELECT * FROM tbl_companymailingcredentials ', (err, rows) => {
    if (!err) {
      res.json({
        message: "fetched successfully",
        data: rows[0],
        error: false
      })
    }
    else {
      res.send(err);
      console.log("credentials does not exist");
    }
  })
};








