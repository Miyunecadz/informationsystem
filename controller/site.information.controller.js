const Information = require("../model/information.model.js");



exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Information
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
  
    Information.create(information, (err, data) => {
      if (err)
        res.status(500).render('addinformation',{
          message:
            err.message || "Some error occurred while creating the Information."
        });
      else res.render('addinformation', {message: "Information Saved"});
    });
};

exports.alldata = (req,res) =>{
  Information.findAll((err,data)=>{
    res.render('viewinformation', {data : data});
  });
}

exports.delete = (req,res) => {
  Information.removeById(req.body.itemid, (err,result) =>{
    res.status(302).redirect('/view');
  })
}

exports.findid = (req,res) => {
  Information.findById(req.params.id, (err, data) =>{
    if(err){
      res.status(404).render('404');
    }else{
      res.render('updateinformation', {data: data});
    }
  })
}

exports.updateid = (req,res) =>{
  Information.updateById(req.params.id, new Information(req.body) ,(err,result) =>{
    res.status(302).redirect('/view');
  })
}