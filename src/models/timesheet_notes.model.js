'user strict';
var dbConn = require('./../../config/db.config');

//Notes object create
var Notes = function(notes){
    this.add_notes     = notes.add_notes;
    this.employeeId          = notes.employeeId;
    // this.status         = notes.status ? notes.status : 1;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};
Notes.create = function (newNotes, result) {    
    dbConn.query("INSERT INTO timesheet_notes set ?", newNotes, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};
// Notes.findById = function (id, result) {
//     dbConn.query("Select * from timesheet_notes where id = ? ", id, function (err, res) {             
//         if(err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else{
//             result(null, res);
//         }
//     });   
// };

Notes.findById = function (employeeId, result) {
    dbConn.query("Select * from timesheet_notes where employeeId = ? ORDER BY created_at DESC", employeeId, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Notes.findAll = function (result) {
    dbConn.query("Select * from timesheet_notes", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('notes : ', res);  
            result(null, res);
        }
    });   
};

Notes.update = function(id, note, result){
  dbConn.query("UPDATE timesheet_notes SET add_notes=? WHERE id = ?", [note.add_notes,id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

Notes.delete = function(id, result){
     dbConn.query("DELETE FROM timesheet_notes WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Notes;
