var dbConn = require('./../../config/db.config');

// Documents object create
var Leave = function (doc) {
    this.name = doc.name;
    this.type = doc.type;
    this.code = doc.code;
    // this.image = doc.image;
    this.unit = doc.unit;
    this.balance = doc.balance;
    this.date_from = doc.date_from;
    this.date_to = doc.date_to;
    this.reason_for_leave = doc.reason_for_leave;
    // this.size = doc.size;
    // this.updated_by = doc.updated_by;
    this.updated_at = new Date();

};


Leave.create = function (newLeaves, result) {
    dbConn.query("Select * from new_leaves_type where date_from=? and date_to= ? and name=?",
        [newLeaves.date_from, newLeaves.date_to, newLeaves.name], function (err, res) {
            if (err || res.length > 0) {
                console.log("error: ", err);
                const msg = "already exist"
                result(err, msg);

            }
            else {
                dbConn.query("INSERT INTO new_leaves_type set ?", newLeaves,
                    function (err, res) {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                        }
                        else {
                            result(null, res.insertId);
                            console.log(res.insertId);

                        }
                    });
            }
        });

};

Leave.update = function (id, leave, result) {
    // const idint = bigInt(id).value;
    dbConn.query("UPDATE new_leaves_type SET name=?,type=?,code=?,unit=?,balance=?,date_from=?, date_to=?, reason_for_leave=? WHERE id =?",
        [leave.name, leave.type, leave.code, leave.unit, leave.balance, leave.date_from, leave.date_to, leave.reason_for_leave, id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

Leave.findAll = function (result) {
    dbConn.query("Select * from new_leaves_type order by updated_at DESC", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('Leaves : ', res);
            result(null, res);
        }
    });
};


Leave.findById = function (id, result) {
    dbConn.query("Select * from new_leaves_type order by Time_Added desc", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


Leave.delete = function (id, result) {
    dbConn.query("DELETE FROM new_leaves_type WHERE id = ?", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};


module.exports = Leave;
