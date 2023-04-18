const configurepayperiod = require('../models/configurepayperiod.model');

exports.findAll = function(req, res) {
    configurepayperiod.findAll(function(err, period) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', period);
    res.send(period);
  });
};


// exports.configure = function(req, res) {
//     const new_period = new configurepayperiod(req.body);

//     //handles null error 
//    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//         res.status(400).send({ error:true, message: 'Please provide all required field' });
//     }else{
//         configurepayperiod.create(new_period, function(err, Period) {
//             if (err)
//             res.send(err);
//             res.json({error:false,message:"configurepayperiod successfully!",data:Period});
//         });
//     }
// };


exports.create = function(req, res) {
    const new_period = new configurepayperiod(req.body);
    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        configurepayperiod.create(new_period,  function(err, period) {
            if (err)
            res.send(err);
            if (period === "already exist")
            res.json({data:period, error:true,message:"Period name already exist with this cycle!"});
            else
            res.json({data:period, error:false,message:"Period Details added successfully!"});
        });
    }
};

exports.findById = function(req, res) {
    configurepayperiod.findById(req.params.ConfigurePayPeriodID, function(err, Period) {
        if (err)
        res.send(err);
        res.json(Period);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        configurepayperiod.update(req.params.ConfigurePayPeriodID, new configurepayperiod(req.body), function(err, Period) {
            if (err)
            res.send(err);
            res.json({ Period : Period, error:false, message: 'configurepayperiod successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    configurepayperiod.delete( req.params.ConfigurePayPeriodID, function(err, employee) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'configurepayperiod successfully deleted' });
  });
};




// const tbl_configurepayperiodmodal = require('../models/tbl_configurepayperiod');

// const getAllUsers = async (req, res) => {
//     try {
//         const [data] = await tbl_configurepayperiodmodal.getAllUsers();
    
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
//     const {ConfigurePayPeriodID} = req.params;
//     try {
//         const [data] = await tbl_configurepayperiodmodal.getbyid(ConfigurePayPeriodID);
    
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
//    // const timestamp = new Date();

//     // if( !body.CompanyID   || !body.PeriodName   || !body.PayPeriodCycle){
//     //     return res.status(400).json({
//     //         message: 'kuch sahi nai hai',
//     //         data: null,
//     //     })
//     // }

//     try {
//         await tbl_configurepayperiodmodal.createNewUser(body);
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
//     getbyid,
// }
