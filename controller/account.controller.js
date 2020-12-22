const Account = require('../model/account.model');

exports.signup = (req,res) =>{
    if(!req.body){
        res.status(400).render('signup', {message: "Please fill-up everything"});
    }
    else{
        const account = new Account({
            username: req.body.username,
            password: req.body.password
        });

        Account.signup(account,(err,data)=>{
            if(err){
                res.status(500).render('signup',{message: err.message});
            }
            else{
                res.status(200).render('signup', {message: "New User Created"})
            }
        })
    }
}

// exports.login = (req,res) =>{
//     if(!req.body){
//         res.status(400).render('login',{message: "Please fill-up the required text area"});
//     }else{
//         Account.login(req.body.username, req.body.password, (err,data)=>{
//             if(err){
//                 if(err.result === 'invalid'){
//                     res.render('login', {message: "Invalid Credentials"});
//                 }else{
//                     res.render('login', {message: "Invalid Credentials"});
//                 }
//             }else{
                
//             }
//         })
//     }
// }