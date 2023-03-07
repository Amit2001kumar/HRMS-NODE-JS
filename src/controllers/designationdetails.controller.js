const designationdetails = require('../models/designationdetails.model');



exports.findAll = function(req, res) {
    designationdetails.findAll(function(err, details) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', details);
    res.send(details);
  });
};


exports.designation = function(req, res) {
    const new_details = new designationdetails(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        designationdetails.create(new_details, function(err, detail) {
            if (err)
            res.send(err);
            res.json({error:false,message:"details applied successfully!",data:detail});
        });
    }
};


exports.findById = function(req, res) {
    designationdetails.findById(req.params.DesignationDetailsID, function(err, detail) {
        if (err)
        res.send(err);
        res.json(detail);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        designationdetails.update(req.params.DesignationDetailsID, new designationdetails(req.body), function(err, detail) {
            if (err)
            res.send(err);
            res.json({ detail : detail, error:false, message: 'details successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    designationdetails.delete( req.params.DesignationDetailsID, function(err, employee) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Employee successfully deleted' });
  });
};


// const getAllUsers = async (req, res) => {
//     try {
//         const [data] = await tbl_designationdetailsmodal.getAllUsers();
    
//         res.json({
//             message: 'GET all users success',
//             data: data
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'Server Error',
//             serverMessage: error,
//         })
//     }
// }


// const getbyid = async (req, res) => {
//     const {DesignationDetailsID} = req.params;
//     try {
//         const [data] = await tbl_designationdetailsmodal.getbyid(DesignationDetailsID);
    
//         res.json({
//             message: 'GET single users success',
//             data: data
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'Server Error',
//             serverMessage: error,
//         })
//     }
// }
// const createNewUser = async (req, res) => {
//     const {body} = req;

//     if( !body.CompanyID  || !body.DesignationName   || !body.MailAlias  ){res
//         return res.status(400).json({
//             message: 'kuch sahi nai hai',
//             data: null,
//         })
//     }

//     try {
//         await tbl_designationdetailsmodal.createNewUser(body);
//         res.status(201).json({
//             message: 'CREATE new user success',
//             data: body
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'Server Error',
//             serverMessage: error,
//         })
//     }
// }



// module.exports = {
//     getAllUsers,
//     createNewUser,
//     getbyid
    
// }