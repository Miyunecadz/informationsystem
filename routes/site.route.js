module.exports = app =>{
    
    const sql = require("../config/database");
    const Account = require("../controller/account.controller");
    const SiteInformation = require("../controller/site.information.controller");

    function checkSession(req,res,next){
        if(req.session.username){
           next();
        }else{
            res.status(200).redirect('/login');
        }
    }

    app.get('/',checkSession, (req,res)=>{
        res.render('index');
    });

    app.get('/login', (req,res)=>{
        if(req.session.username){
            res.status(200).redirect('/');
        }else{
            res.render('login', {message: null});
        }
    });

    app.post('/login', (req,res)=>{
        let username = req.body.username;
        let password = req.body.password;

        if(username && password){
            sql.query(`SELECT * FROM account WHERE username = ? AND password = ?`,[username,password], (err, result)=>{
                if(result.length > 0)
                {
                    req.session.username = username;

                    res.status(200).redirect('/');
                }else{
                    res.status(404).render('login', {message:"Invalid Credentials"});
                }
            });
        }else{
            res.status(200).render('login', {message: "Please enter username and password"});
        }
    });

    app.get('/signup', (req,res)=>{
        if(req.session.username){
            res.status(200).redirect('/');
        }else{
            res.render('signup', {message: null});
        }
    })

    app.post('/signup', Account.signup);

    app.get('/logout', (req,res)=>{
        if(req.session.username)
        {
            req.session.username= null;

            req.session.destroy((err)=>{
              res.status(200)  .redirect('/login');
            })
        }else{
            res.redirect('/login');
        }
    });

    app.get("/about", checkSession, (req,res)=>{
        res.status(200).render('about');
    })

    app.get("/api",checkSession, (req,res) =>{
        res.statusCode = 200;
        res.render('api');
      })

    app.get('/add',checkSession, (req,res) =>{
        res.render('addinformation', {message: null});
      });
      
      app.post('/add',checkSession, SiteInformation.create);
      
      app.get('/view',checkSession, SiteInformation.alldata);
    
      app.post('/view/delete',checkSession, SiteInformation.delete);
    
      app.get('/view/:id',checkSession, SiteInformation.findid);
    
      app.post('/view/:id',checkSession, SiteInformation.updateid);
    
}