const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey')
const conn = require('./../../../config/db.config').promise();
var nodemailer=require("nodemailer");
const express=require("express");
const { log } = require('async');
const app=express();
app.use(express.json());
exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

      const [rows0] =await conn.execute("Select * from onboarding_credentials where company_email_id=? ",
      [req.body.company_email_id])
      if(rows0?.length>0){
        return res.json({
          message:"Company Email is already exist",
          error:false
        })
          
      }
          
        const hashPass =await bcrypt.hash(req.body.password, 12);
               const hashPassconfirm =await bcrypt.hash(req.body.confirm_password, 12);
const decryptedString =await cryptr.decrypt(req.body.pass); //info pass decrpt
//        console.log("decryptedString",decryptedString);
console.log("data",req.body)
        const [rows] =await conn.execute('INSERT INTO `onboarding_credentials`(`emp_name`,`emp_id`,`company_id`,`joining_date`,`location`,`roll_id`,`designation`,`company_email_id`,`password`,`confirm_password`,`phone_number`,`checkbox`,`personal_email_id`,`created_by`)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
       
   [
           req.body.emp_name,
            req.body.emp_id,
             req.body.company_id,
            req.body.joining_date,
            req.body.location,
            req.body.roll_id,
            req.body.designation,
            req.body.company_email_id,
            hashPass,
            hashPassconfirm,
            req.body.phone_number,
            req.body.checkbox,
            req.body.personal_email_id,
            req.body.created_by
       ]);
       console.log(req.body)

        if (rows.affectedRows === 1)
      {
                    //...............
            var transporter = nodemailer.createTransport({

//                 host: "smtp.gmail.com",
        
//                 port: 465,
        
//                 secure: true,
        
//                 requireTLS: true,
        
//                 auth: {
        
               
//                    user: "ab308175@gmail.com",
        
//                    pass: "diaxeomfpnepqsok"

                 
        
//                 },
                
                
               host: "smtp-mail.outlook.com", // hostname
              secureConnection: false, // TLS requires secureConnection to be false
              port: 587, // port for secure SMTP
              tls: {
                 ciphers:'SSLv3'
              },
                
                
                   auth:{
                user:req.body.usermailid,
                pass:decryptedString                              //req.body.pass
              },
                

             
                
        
              });
        
        
              var mailOptions = {
        
               
//                  from:"ab308175@gmail.com",
//                    from:"asma.bano@cylsys.com",
                  
               from:req.body.usermailid,
               
                to: req.body.company_email_id,
        
                subject: "Company Login Credentials",
        
                // html:"<h3>Hello:</h3> "+req.body.FirstName+"    "+req.body.LastName+" <br><br><h3>This is your Email id:</h3> "+req.body.Email+"<h1>Password is: </h1>"+req.body.Password
                // +"'<br><br><h1>please click on this link for completing your Pre-Onboarding Process:</h1>"+"http://welcomeemp.cylsys.com/"
                 
                html:"Hi"+" "+req.body.emp_name+","+"<br>"+

                "<br>This is your company onboarding details.<br>"+
                
                "<br>Please find the Login Credentials here:<br>"+
                
                "<br>Display name:"+" "+ req.body.emp_name+
                // "<br>Emloyee id:" +" "+req.body.emp_id+ 
                // "<br>Joining Date:" +" "+req.body.joining_date+ 
                // "<br>Designation:" +" "+req.body.designation+ 
                // "<br>Location:" +" "+req.body.location+
                // "<br>Role:" +" "+req.body.roll_id+
                "<br>Company email id:" +" "+req.body.company_email_id+ 
                "<br>Password:" +" "+req.body.password+ "<br><br>"+
                  
                "<br>Phone Number:" +" "+req.body.phone_number+ "<br><br>"+
                
                "Login Url:"+" "+"http://angularhrms.cylsys.com"+"<br>"+
                
                "<br>Note: "+" Please let me know if you need any clarifications."+"<br>"+
                
                "<br>Thanks & Regards,<br>"+
                "Jagrati Thakur<br>"+
                "Team HR<br>"+
                "Cylsys Software Solutions Pvt. Ltd."
                
                
                
                
          
              };
        
        
              transporter.sendMail(mailOptions, function (error, info)
               {
        
                if (error)
                 {
        
                  console.log(error);
        
                } else 
                {
        
                  console.log("Email has been sent", info.response);
        
                }
        
              });

                  //................
            return res.status(201).json({
                message: "The employee onboarding details has been successfully inserted. and Email has been sent",
            });
        }
        
    
      
    
       
          }//
       catch(err){
        next(err);
       }
      
}


