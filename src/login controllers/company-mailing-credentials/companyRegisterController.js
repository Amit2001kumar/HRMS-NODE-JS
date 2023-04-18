const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('./../../../config/db.config').promise();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey')
const express=require("express");
const app=express();
app.use(express.json());
exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{



      const [rows0] =await conn.execute("Select * from tbl_companymailingcredentials where companyId=? or companyOfficialEmail=? ",
      [req.body.companyId,req.body.companyOfficialEmail])
      if(rows0?.length>0){
        return res.json({
          message:"Company Official Email and Company id is already exist",
          error:false
        })
      }

          
        // const hashPass =await bcrypt.hash(req.body.password, 12);
// console.log(req.body);


const encryptedString =await cryptr.encrypt(req.body.password);
const decryptedString = cryptr.decrypt(encryptedString);
       console.log("encrypted",encryptedString);
       console.log("decrypted",decryptedString);
        const [rows] =await conn.execute('INSERT INTO `tbl_companymailingcredentials`(`companyId`,`companyName`,`companyOfficialEmail`,`password`)VALUES(?,?,?,?)',
       
   [
           req.body.companyId,
            req.body.companyName,
            req.body.companyOfficialEmail,
            encryptedString,
      
            
       ]);
      //  console.log(req.body)

        if (rows.affectedRows === 1)
      {
                
                  //................
            return res.status(201).json({
                message: "Company mailing credentials registered successfully",
            });
        }
        
    
      
    
       
          }//
       catch(err){
        next(err);
       }
      
}


