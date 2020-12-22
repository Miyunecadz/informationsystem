const { SSL_OP_NO_QUERY_MTU } = require("constants");

const sql = require("../config/database");
class Account {
    constructor(account){
        this.username = account.username;
        this.password = account.password;
    }

    // login(username, password, result){
    //     sql.query(`select * from account where username = ${username} and password = ${password}`, (err,res)=>{
    //         if(err){
    //             console.log("Error: ", err);
    //             result(err,null);
    //             return;
    //         }

    //         if(res.length){
    //             result(null, res[0]);
    //             return;
    //         }

    //         result({result: 'invalid'});
    //     })
    // }
}

Account.signup = (newaccount, result) =>{
    sql.query('insert into account set ?', newaccount,(err,res)=>{
        if(err){
            console.log('Error: ', err);
            result(err,null);
            return;
        }else{
            console.log('New Account Created: ', {id: res.insertid, ...Account});
            result(null,{id: res.insertid, ...Account});
        }
    })
}

module.exports = Account;