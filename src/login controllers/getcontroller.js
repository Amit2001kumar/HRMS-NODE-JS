const dbConn = require('./../../config/db.config')

exports.getUserName = (req,res) =>{
        dbConn.query('SELECT `FirstName`,`LastName` FROM invite_users WHERE Email = ?',[req.params.Email], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else{
        res.send(err);
        console.log("user not exist");}
        })
        };

        exports.getAllUser = (req,res) =>{
                dbConn.query('SELECT * FROM invite_users ', (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else{
                res.send(err);
                console.log("user not exist");}
                })
                };
                        
        