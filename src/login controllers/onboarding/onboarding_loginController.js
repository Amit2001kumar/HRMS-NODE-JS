const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const dbConn = require('./../../../config/db.config').promise();

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const [row] = await dbConn.execute(
      // "SELECT * FROM `users` WHERE `Email`=?",
      "SELECT * FROM `onboarding_credentials` WHERE `company_email_id`=?",

      [req.body.company_email_id]
    );

    if (row.length === 0) {
      // return res.status(422).json({
      return res.json({
        message: "Invalid email address",
      });
    }

    const passMatch = await bcrypt.compare(req.body.password, row[0].password);
    if (!passMatch) {
      // return res.status(422).json({
      return res.json({
        message: "Incorrect password",
      });
    }

    const theToken = jwt.sign({ id: row[0].id }, "the-super-strong-secrect", {
      expiresIn: "1h",
    });

    return res.json({
      success: row,
      message: "Employee Login Successfully",
      token: theToken,
    });
  } catch (err) {
    next(err);
  }
};
