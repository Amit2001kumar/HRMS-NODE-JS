'user strict';
var dbConn = require('./../../config/db.config');

//Employee object create
var Employee = function (employee) {
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.email = employee.email;
     this.employee_id=employee.employee_id;
    this.Date_of_Birth = employee.Date_of_Birth;
    this.employee_role=employee.employee_role;
    this.marital_status=employee.marital_status;
    this.employee_type=employee.employee_type;
    this.employee_status=employee.employee_status;
    this.work_location=employee.work_location;
    this.Date_of_joining=employee.Date_of_joining;
    this.Title=employee.Title;
    this.gender=employee.gender;
    this.age=employee.age;
    this.phone = employee.phone;
    this.organization = employee.organization;
    this.designation = employee.designation;
    this.salary = employee.salary;
    this.total_experience     = employee.total_experience;
    this.official_email = employee.official_email;
    this.source_of_hire = employee.source_of_hire;
    this.tentative_joining_date = employee.tentative_joining_date;
    this.skill_set = employee.skill_set;
    this.highest_qualification = employee.highest_qualification;
    this.additional_information = employee.additional_information;
    this.password=employee.password;
    this.reporting_manager=employee.reporting_manager;
    this.company_id=employee.company_id;
    this.status = employee.status ? employee.status : 1;
    this.created_at = new Date();
    this.modified_time = new Date();
    this.department="IT";
    
};

Employee.create = function (newEmp, education, experience, address, pAddress, result) {
    let educationValues = [];
    let experienceValues = [];
    let addressValues = [];
    let p_addressValues = [];
   

    for (let i = 0; i < education.length; i++) {
        let id;
        educationValues.push([
            id,
            education[i].institute_name,
            education[i].degree,
            education[i].date_of_completion,
            education[i].field_of_study,
            newEmp.email,
            education[i].company_id
        ])
    }

    for (let i = 0; i < experience.length; i++) {
        let id;
        experienceValues.push([
            id,
            experience[i].occupation,
            experience[i].company,
            experience[i].fromDate,
            experience[i].toDate,
            experience[i].duration,
            newEmp.email,

            experience[i].currently_work_here,
            experience[i].company_id
        
        ])
    }

    for (let i = 0; i < address.length; i++) {
        let id;
        addressValues.push([
            id,
            address[i].country,
            address[i].state,
            address[i].city,
            address[i].pin_code,
            address[i].street_address,
            newEmp.email,
            address[i].address_type,
            address[i].same_as_current_address,
            address[i].company_id

        ])
     
    }

    console.log("modal",pAddress);
    for (let i = 0; i < pAddress.length; i++) {
        let id;
        p_addressValues.push([
            id,
            pAddress[i].pCountry,
            pAddress[i].pState,
           pAddress[i].pCity,
            pAddress[i].pPin_code,
          pAddress[i].pStreet_address,
           newEmp.email,
             pAddress[i].address_type,
           pAddress[i].same_as_current_address,
       pAddress[i].company_id
            ])}
console.log(p_addressValues);
    dbConn.query("INSERT INTO employees set ?", newEmp,
        function (err, res) {
            if (err)
                throw err;
            console.log("EMP of records inserted: " + res.affectedRows);

            dbConn.query("INSERT INTO education VALUES ?", [educationValues],
                function (err, res) {
                    if (err) throw err;
                    console.log("Education of records inserted: " + res.affectedRows);

                    dbConn.query("INSERT INTO experience VALUES ?", [experienceValues],
                        function (err, res) {
                            if (err)
                                throw err;
                            console.log("exp of records inserted: " + res.affectedRows);
                            //else 

                        });
                    dbConn.query("INSERT INTO employee_address VALUES ?", [addressValues],
                        function (err, res) {
                            if (err) throw err;
                            console.log("address of records inserted: " + res.affectedRows);
                            dbConn.query("INSERT INTO employee_address VALUES ?", [p_addressValues],
                            function (err, res) {
                                if (err) throw err;
                                console.log("address of records inserted: " + res.affectedRows);

                            });

                        });
                });
            result(null, res.insertId);
        });
 
};




Employee.findById = function (id, result) {
    dbConn.query("Select * from employees where email = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Employee.findAll = function (company_id,result) {
    dbConn.query("Select * from employees where company_id=?",company_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('employees : ', res);
            result(null, res);
        }
    });
};

Employee.delete = function (email, result) {
  
   
    dbConn.query("DELETE FROM employees WHERE email = ?", [email],
        function (err, res) {
            if (err)
                throw err;
        
            dbConn.query("DELETE FROM education WHERE email = ?", [email],
                function (err, res) {
                    if (err) throw err;
                    console.log("Education of records deleted: " + res.affectedRows);

                    dbConn.query("DELETE FROM experience WHERE email = ?", [email],
                        function (err, res) {
                            if (err)
                                throw err;
                            console.log("exp of records deleted: " + res.affectedRows);
                            //else 

                        });
                    dbConn.query("DELETE FROM employee_address WHERE email = ?", [email],
                        function (err, res) {
                            if (err) throw err;
                            console.log("address of records deleted: " + res.affectedRows);

                            

                        });
                });
            result(null, res);
        });
    
};



  Employee.Interviewer  = function (result) {
        dbConn.query("SELECT first_name, last_name FROM employees", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log(' employees: ', res);  
                result(null, res);
            }
        });   
      };
    
    

Employee.update = function (email,employee,education, experience, address, pAddress, result) {
        let educationValues = [];
        let experienceValues = [];
        let addressValues = [];
        let p_addressValues = [];
        // let docsValues = [];
    
        for (let i = 0; i < education.length; i++) {
            
            educationValues.push([
                education[i].id,
                education[i].institute_name,
                
                education[i].degree,
                education[i].date_of_completion,
                education[i].field_of_study,
                
            ])
        }
    
        for (let i = 0; i < experience.length; i++) {
            experienceValues.push([
                experience[i].id,
                experience[i].occupation,
                experience[i].company,
                experience[i].fromDate,
                experience[i].toDate,
                experience[i].duration,
              
    
                experience[i].currently_work_here])
        }
    
        for (let i = 0; i < address.length; i++) {
            addressValues.push([
                
               
                address[i].country,
                address[i].state,
                address[i].city,
                address[i].pin_code,
                address[i].street_address,
                
                address[i].address_type,
                address[i].same_as_current_address
    
            ])
         
        }
    
        // console.log("modal",pAddress);
        for (let i = 0; i < pAddress.length; i++) {
            p_addressValues.push([
              
                pAddress[i].pCountry,
                pAddress[i].pState,
               pAddress[i].pCity,
                pAddress[i].pPin_code,
              pAddress[i].pStreet_address,
              
                 pAddress[i].address_type,
               pAddress[i].same_as_current_address
           
                ])}
   
       
       //dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=?, total_experience=?,additional_information=? WHERE email= ?", [employee.first_name, employee.last_name, employee.email, employee.phone, employee.organization, employee.designation, employee.salary, employee.total_experience, employee.additional_information, email],
  
    dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,official_email=?,Date_of_Birth=?,source_of_hire=?,skill_set=?,tentative_joining_date=?,highest_qualification=?,organization=?,designation=?,salary=?, total_experience=?,additional_information=? WHERE email= ?", [employee.first_name, employee.last_name, employee.email, employee.phone,employee.official_email,employee.Date_of_Birth,employee.source_of_hire,employee.skill_set,employee.tentative_joining_date,employee.highest_qualification, employee.organization, employee.designation, employee.salary, employee.total_experience, employee.additional_information, email],

        function (err, res) {
                if (err)
                    throw err;
                console.log("EMP of records updated: " + res.affectedRows);
    
                for(let i = 0; i < education.length; i++){
                dbConn.query("UPDATE education SET institute_name=?,degree=?,date_of_completion=?,field_of_study=? where email=? && id=?", [education[i].institute_name,education[i].degree,education[i].date_of_completion,education[i].field_of_study,email,education[i].id],
                    function (err, res) {
                        if (err) throw err;
                        console.log("Education of records inserted: " + res.affectedRows);
                    });}

                    for(let i = 0; i < experience.length; i++){
                        dbConn.query("UPDATE experience SET occupation=?,company=?,fromDate=?,toDate=?,duration=?,currently_work_here=? WHERE email=? && id=?",  [experience[i].occupation,experience[i].company,experience[i].fromDate,experience[i].toDate,experience[i].duration,experience[i].currently_work_here,email,experience[i].id],
                            function (err, res) {
                                if (err)
                                    throw err;
                                console.log("exp of records inserted: " + res.affectedRows);
                                //else 
    
                            });}

                            for(let i = 0; i < address.length; i++){
                        dbConn.query("UPDATE employee_address SET country=?,state=?,city=?,pin_code=?,street_address=?,same_as_current_address=? WHERE email=? && address_type='present address'", [address[i].country,address[i].state,address[i].city,address[i].pin_code,address[i].street_address,address[i].same_as_current_address,email],
                            function (err, res) {
                                if (err) throw err;
                                console.log("address of records inserted: " + res.affectedRows);
    
                            });
                        }

                            for(let i = 0; i < pAddress.length; i++){
                                dbConn.query("UPDATE employee_address SET country=?,state=?,city=?,pin_code=?,street_address=?,same_as_current_address=? WHERE email=? && address_type='permanent address'" , [pAddress[i].pCountry,pAddress[i].pState,pAddress[i].pCity,pAddress[i].pPin_code,pAddress[i].pStreet_address,pAddress[i].same_as_current_address,email],
                                function (err, res) {
                                    if (err) throw err;
                                    console.log("address of records inserted: " + res.affectedRows);
    
                                });
                            }
    
                            
                    
                    console.log("check")
                result(null, res.insertId);
            });
    };


Employee.updateAfterPreonBoarding = function(email, Details, result){
      
       dbConn.query("UPDATE employees SET employee_id=?,official_email=?,password=?,modified_time=?,age=?,gender=?,Title=?,Date_of_joining=?,work_location=?,employee_role=?,marital_status=?,employee_type=?,employee_status=?,reporting_manager=? where email=?",
       [  
        Details.employee_id,Details.official_email,Details.password,Details.modified_time,Details.age,Details.gender,Details.Title,Details.Date_of_joining,Details.work_location,Details.employee_role,Details.marital_status,Details.employee_type,Details.employee_status, 
           Details.reporting_manager,email], function (err, res) {
             if(err) {
                 console.log("error: ", err);
                 result(null, err);
             }else{   
                 result(null, res);
             }
         }); 
       };

 Employee.findEmployeeByEmployeeId = function (employee_id, result) {
        dbConn.query("Select * from employees where employee_id = ? ", employee_id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    };
Employee.SearchEmployeeByEmployeeIdAndName = function (company_id,employee_id,first_name,last_name, result) {
        dbConn.query("Select * from employees where company_id=? OR employee_id = ? OR first_name=? OR last_name=? ", [company_id,employee_id,first_name,last_name], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    };  

Employee.SearchAllEmployeeByEmployeeIdAndName = function (company_id,employee_id,first_name,last_name, result) {
        dbConn.query("Select * from employees where company_id=?", [company_id,employee_id,first_name,last_name], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    };  
module.exports = Employee;
