'user strict';
var dbConn = require('./../../config/db.config');

//Notes object create
var Notes = function(notes){
    this.add_notes     = notes.add_notes;
    this.email          = notes.email;
    this.company_id=notes.company_id;
    // this.status         = notes.status ? notes.status : 1;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};
Notes.create = function (newNotes, result) {    
    dbConn.query("INSERT INTO notes set ?", newNotes, function (err, res) {
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
Notes.findByCompanyId = function (email,company_id, result) {
    dbConn.query("Select * from notes where email=? AND company_id = ? ",[email,company_id], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Notes.findById = function (email, result) {
    dbConn.query("Select * from notes where email = ? ORDER BY created_at DESC", email, function (err, res) {             
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
    dbConn.query("Select * from notes", function (err, res) {
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
  dbConn.query("UPDATE Notes SET add_notes=? WHERE id = ?", [note.add_notes,id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Notes.delete = function(id, result){
     dbConn.query("DELETE FROM notes WHERE id = ?", [id], function (err, res) {
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
