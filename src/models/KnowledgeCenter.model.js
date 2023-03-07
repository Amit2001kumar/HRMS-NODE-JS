'user strict';
var dbConn = require('./../../config/db.config');

// Documents object create
var KnowledgeCenter = function(doc){
    this.Title = doc.Title;
    this.Link = doc.Link
    this.documentname     = doc.documentname;
    this.AddDescription = doc.AddDescription
    this.updated_by   = doc.updated_by;
    this.updated_at    = new Date();
};

KnowledgeCenter.findAll = function (result) {
    dbConn.query("SELECT * FROM knowledgecenter  order by uploadedDate asc Limit 3 ", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
           console.log('KnowledgeCenter : ', res); 
            result(null, res);
        }
    });  
};


KnowledgeCenter.findById = function (KnowledgeCenterid, result) {
    dbConn.query("Select * from KnowledgeCenter where KnowledgeCenterid = ?", KnowledgeCenterid, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

KnowledgeCenter.delete = function(KnowledgeCenterid, result){
    dbConn.query("DELETE FROM KnowledgeCenter WHERE KnowledgeCenterid = ?", [KnowledgeCenterid], function (err, res) {
       if(err) {
           console.log("error: ", err);
           result(null, err);
       }
       else{
           result(null, res);
       }
   }); 
};



module.exports= KnowledgeCenter;