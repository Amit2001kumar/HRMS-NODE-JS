var dbConn = require('./../../config/db.config');

//WorkingDay object create
var AddWorkingDay = function (WorkingDay) {
    this.Name = WorkingDay.Name;
    this.Validity = WorkingDay.Validity;
    this.Description = WorkingDay.Description;
    this.ExampleTextarea = WorkingDay.ExampleTextarea;
    this.createdDate = new Date();

};
AddWorkingDay.create = function (newWorkingDay, result) {
    dbConn.query("INSERT INTO add_working_day set ?", newWorkingDay, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

AddWorkingDay.findById = function (id, result) {
    dbConn.query("Select * from add_working_day where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

AddWorkingDay.findAll = function (result) {
    dbConn.query("Select * from add_working_day", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('WorkingDay : ', res);
            result(null, res);
        }
    });
};

AddWorkingDay.update = function (id, WorkingDay, result) {
    // const idint = bigInt(id).value;
    dbConn.query("UPDATE add_working_day SET Name=?,Validity=?,Description=?,ExampleTextarea=? WHERE id =?",
        [WorkingDay.Name, WorkingDay.Validity, WorkingDay.Description, WorkingDay.ExampleTextarea,  id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

AddWorkingDay.delete = function (id, result) {
    dbConn.query("DELETE FROM add_working_day WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = AddWorkingDay;