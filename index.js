const fs = require('fs');
var path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const Querystring  = require('querystring');
const app = express();
var dbConnection = require("./dbHandler");
var mysqlpool    = dbConnection.mysqlpool;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/*', function(req, res, next) {
	
	res.header('Access-Control-Allow-Origin', "*"); //restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', '*');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", "true");
	res.contentType('application/json');
	next();
	
});

app.get('/signIn',function(req,res){
	 res.json('in SignIn');
});

app.post('/signUp',function(req,res){
	res.json('in SignUp');		
});

app.post('/saveStudentData',function(req,res){
    var name  =  req.body.name;
    var email  =  req.body.email;
    var phone  =  req.body.phone;

    mysqlpool.getConnection(function (err, conn) {

        if (err) {
            err.msg = 'error in adding student data';
            callback(err);
        }
        else {

            conn.query("CALL add_user_data(?,?,?)",[name,email,phone],function (err, rows, fields) {
                mysqlpool.release(conn)

                if (err) {
                    err.msg = 'error in adding student data';
                    res.json(err);
                }
                else {
                    console.log(JSON.stringify(rows));
                    res.json({status:1,msg:'Student Data Saved'});
                    //callback(null,rows[0][0]);
                }

            });

        }
    });

});

process.on('uncaughtException', function(err) {
    console.log("*****************crashed App**************");
    console.log("application crash error "+err+ " at line "+err.stack);
	//app.appCrashEvent(err);
});


app.listen('3003');

