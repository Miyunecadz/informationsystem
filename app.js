const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

require('./routes/information.route.js')(app);
require('./routes/site.route')(app);

app.listen(3000, () =>{
    console.log("Server start at port 3000...");
})