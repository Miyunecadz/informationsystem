const Information = require('../model/information.model.js');

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            status: "failed",
            message: "Content can not be empty"
        });
    }else{
        const information = new Information({
            firstname : req.body.firstname,
            middlename : req.body.middlename,
            lastname : req.body.lastname,
            gender : req.body.gender,
            address : req.body.address,
            number : req.body.number,
            email : req.body.email,
            birthdate :  req.body.birthdate,
            birthplace :  req.body.birthplace,
            civilstatus :  req.body.civilstatus,
            citizenship :  req.body.citizenship,
            occupation :  req.body.occupation,
            fathername :  req.body.fathername,
            fatheroccupation : req.body.fatheroccupation,
            fatheraddress :  req.body.fatheraddress,
            mothername :  req.body.mothername,
            motheroccupation :  req.body.motheroccupation,
            motheraddress :  req.body.motheraddress
        });

        Information.create(information,(err,data)=>{
            if(err){
                res.status(500).send({
                    status: "failed",
                    message: err.message || "Some error occurred while creating information"
                });
            }else{
                res.send({
                    status: "success",
                    message: "New Information Created"
                })
            }
        })
    }
}


exports.findAll = (req,res) =>{
    Information.findAll((err,data)=>{
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Information."
        });
      else res.send({status: 'success',data: data});
    })
}

exports.findById = (req,res) => {
    Information.findById(req.params.id, (err,data)=>{
        if(err){
            if(err.result === "not_found"){
                res.status(404).send({
                    status:"failed",
                    message: `No Information found with id ${req.params.id}`
                });
            }else{
                res.status(500).send({
                    status: "failed",
                    message: `Error retrieving data with id ${req.params.id}`
                  });
            }
        }else{
            res.send({
                status: "success",
                data: data
            })
        }
    })
}

exports.updateById = (req,res) => {
    if(!req.body){
        res.status(400).send({
            status: "failed",
            message: "Content cannot be empty"
        });
    }else{
        Information.updateById(req.params.id, new Information(req.body),(err,data) =>{
            if(err){
                if(err.result === "not_found"){
                    res.status(404).send({
                        status: "failed",
                        message: `No information found with id ${req.params.id}`
                    });
                }else{
                    res.status(500).send({
                        status: "failed",
                        message: `Error updating Information with id ${req.params.id}`
                      });
                }
            }else{
                res.send({
                    status: "success",
                    message: `Information successfully update with id ${req.params.id}`,
                    data: data
                })
            }
        })
    }
}


exports.deleteById = (req,res) =>{
    Information.removeById(req.params.id,(err,data)=>{
        if(err){
            if(err.result === "not_found"){
                res.status(404).send({
                    status: "failed",
                    message: `No information found with id ${req.params.id}`
                });
            }else{
                res.status(500).send({
                    status: "failed",
                    message: `Error deleting Information with id ${req.params.id}`
                  });
            }
        }else{
            res.send({
                status: "success",
                message: `Information successfully deleted with id ${req.params.id}`
            })
        }
    })
}

exports.deleteAll = (req,res) => {
    Information.deleteAll((req,res)=>{
        if(err){
            res.status(500).send({
                status: "failed",
                message: err.message || "Some error occurred while removing all information"
            })
        }else{
            res.send({
                status: "success",
                message: "All information successfully deleted"
            })
        }
    })
}