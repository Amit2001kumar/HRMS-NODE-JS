const customizebalance = require('../models/customizebalance.model');


exports.findAll = function(req, res) {
    customizebalance.findAll(function(err, balance) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', balance);
    res.send(balance);
  });
};


exports.customize = function(req, res) {
    const new_balance = new customizebalance(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        customizebalance.create(new_balance, function(err, balance) {
            if (err)
            res.send(err);
            res.json({error:false,message:"customizebalance successfully!",data:balance});
        });
    }
};


exports.findById = function(req, res) {
    customizebalance.findById(req.params.CustomizeBalanceID, function(err, balance) {
        if (err)
        res.send(err);
        res.json(balance);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        customizebalance.update(req.params.CustomizeBalanceID, new customizebalance(req.body), function(err, balance) {
            if (err)
            res.send(err);
            res.json({ balance : balance, error:false, message: 'customizebalance successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    customizebalance.delete( req.params.CustomizeBalanceID, function(err, employee) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Employee successfully deleted' });
  });
};


// const tbl_customizebalance = require('../models/customizebalance.model');

// const getAllUsers = async (req, res) => {
//     try {
//         const [data] = await tbl_customizebalance.getAllUsers();
    
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

// const createNewUser = async (req, res) => {
//     const {body} = req;

//     if(!body.CompanyID || !body.Employee ){res
//         return res.status(400).json({
//             message: 'kuch achcha nai chal raha',
//             data: null,
//         })
//     }

//     try {
//         await tbl_customizebalance.createNewUser(body);
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

// const updateUser = async (req, res) => {
//     const {idUser} = req.params;
//     const {body} = req;
//     try {
//         await tbl_customizebalance.updateUser(body, idUser);
//         res.json({
//             message: 'UPDATE user success',
//             data: {
//                 id: idUser,
//                 ...body
//             },
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'Server Error',
//             serverMessage: error,
//         })
//     }
// }

// const deleteUser = async (req, res) => {
//     const {CustomizeBalanceID} = req.params;
//     try {
//         await tbl_customizebalance.deleteUser(CustomizeBalanceID);
//         res.json({
//             message: 'DELETE user success',
//             data: null
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'Server Error',
//             serverMessage: error,
//         })
//     }
// }
// const getbyid = async (req, res) => {
//     const {CustomizeBalanceID} = req.params;
//     try {
//         const [data] = await tbl_customizebalance.getbyid(CustomizeBalanceID);
    
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

// module.exports = {
//     getAllUsers,
//     createNewUser,
//     updateUser,
//     deleteUser,
//     getbyid
// }