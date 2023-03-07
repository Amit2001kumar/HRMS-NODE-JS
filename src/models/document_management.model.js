
const bigInt = require("big-integer");
var dbConn = require('./../../config/db.config');

//Document_Management object create
var documentmanagement = function(doc){
    // this.Documentid     = Document_Management.Documentid;
    this.CompanyID      = doc.CompanyID;
    this.documentname   = doc.documentname;
    this.module         = doc.module;
    this.documenttype    = doc.documenttype;
    this.fileformate = doc.fileformate
    this.filesize = doc.filesize
   this. updated_at = new Date();
    
    
};
// var k =""
documentmanagement.create = function (doc, result) {    
 var k = Object.values(doc)

    
    dbConn.query("call hrms.add_doc_management(?,?,?,?,?,?)",k, function (err, res) {
        if(err) {
            // console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result( res.insertId ,res[0] );
            // console.log(res[0])
            
        }
    });           
};







documentmanagement.findById = function (Documentid, result) {
    dbConn.query("Select * from Document_Management where Documentid = ? ", Documentid, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

documentmanagement.findAll = function (result) {
    dbConn.query("Select * from Document_Management", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('Document_Management : ', res);  
            result(null, res);
        }
    });   
};

documentmanagement.update = function(Documentid, DOC, result){
   // const idint = bigInt(id).value;
  dbConn.query("UPDATE Document_Management SET CompanyID=?,documentname=?,module=?,documenttype=?,fileformate=?,filesize=?, updated_at=? WHERE Documentid =?",
  [DOC.CompanyID,DOC.documentname,DOC.module,DOC.documenttype,DOC.fileformate,DOC.filesize,DOC.updated_at, Documentid], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

documentmanagement.delete = function(Documentid, result){
     dbConn.query("DELETE FROM Document_Management WHERE Documentid = ?", [Documentid], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};


documentmanagement.documentname = function (documentname,module, result) {

    console.log(documentname,module)
    
    dbConn.query("SELECT * FROM document_management where documentname = ? AND module = ? ", documentname,module, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};


documentmanagement.module = function (module, result) {
    dbConn.query("SELECT * FROM document_management where module = ? ", module, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};


documentmanagement.findBySearch = function (params, result) {
    let module = params.module;
    let documentname = params.documentname;
 
    var sql = 'SELECT * FROM document_management WHERE module = ? OR documentname = ?';
    dbConn.query(sql, [module, documentname], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

module.exports= documentmanagement;
