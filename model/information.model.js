const sql = require('../config/database');

const Information = function(information){
    this.firstname = information.firstname;
    this.middlename = information.middlename;
    this.lastname = information.lastname;
    this.gender = information.gender;
    this.address = information.address;
    this.number = information.number;
    this.email = information.email;
    this.birthdate = information.birthdate;
    this.birthplace = information.birthplace;
    this.civilstatus = information.civilstatus;
    this.citizenship = information.citizenship;
    this.occupation = information.occupation;
    this.fathername = information.fathername;
    this.fatheroccupation = information.fatheroccupation;
    this.fatheraddress = information.fatheraddress;
    this.mothername = information.mothername;
    this.motheroccupation = information.motheroccupation;
    this.motheraddress = information.motheraddress;
}

Information.create = (newInfo, result) =>{
    sql.query('INSERT INTO information SET ?', newInfo, (err,res) =>{
        if(err){
            console.log('Error: ',err);
            result(err,null);
            return;
        }else{
            console.log('Created Information: ', {id: res.insertid, ...newInfo});
            result(null,{id: res.insertid, ...newInfo});
        }
    })
}

Information.findAll = result => {
    sql.query("SELECT * FROM information", (err,res) =>{
        if(err){
            console.log('Error :', err);
            result(err,null);
            return;
        }else{
            console.log('Information: ', res);
            result(null,res);
        }
    })
}

Information.findById = (id, result) =>{
    sql.query(`select * from information where id = ${id}`, (err,res) =>{
        if(err){
            console.log('Error', err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log('Found Information: ', res[0]);
            result(null, res[0]);
            return;
        }else

        result({result: 'not_found'});
    })
}

Information.updateById = (id,information, result) =>{
    sql.query('update information set ? where id = ?', [information, id], (err,res) =>{
        if(err){
            console.log('Error', err);
            result(err,null);
            return;
        }
        
        if(res.affectedRows == 0){
            result({result: 'not_found'},null);
            return;
        }else

        console.log('Update Information: ', {id: id, ...information});
        result(null, {id: id, ...information});
    })
}

Information.removeById = (id, result) =>{
    sql.query(`delete FROM information where id = ${id}`, (err,res)=>{
        if(err){
            console.log('Error', err);
            result(err,null);
            return;
        }

        if(res.affectedRows == 0){
            result({result: 'not_found'}, null);
            return;
        }else{
            console.log('Delete Information id = ',id);
            result(null, {result:'success'});
        }
    })
}


Information.dropAll = result =>{
    sql.query('delete information', (err,res)=>{
        if(err){
            console.log("Error ",err);
            result(err,null);
            return;
        }

        console.log(`Delete ${res.affectedRows} Information`);
        resul(null,res);
    })
}

module.exports = Information;