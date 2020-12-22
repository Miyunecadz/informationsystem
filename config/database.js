const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'infodb'
});

con.connect(error => {
    if(error) throw error;

    console.log('connected to database');
});

module.exports = con;