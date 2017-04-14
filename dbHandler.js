var configProp=require("./configLoader");
var mysql 			= require('mysql');
var genericpool 	= require('generic-pool');

var configObj=configProp.configObj;
var dbProp=configObj["db"];

var pool  = mysql.createPool({
	host: dbProp["url"],
	database: dbProp["dbname"],
	user: dbProp["username"],
	password: dbProp["password"],
	connectionLimit:1000,
    connectTimeout:20000,
    acquireTimeout:20000,
    multipleStatements:true
});

function dbHandler(){
    this.getConnection(function(err,conn){
        console.log("create connection");
        if(err){
            console.log("**** Error in making database connection *****");
        }
        else{
            console.log("*** Database connection established ***");
        }
    })
}

dbHandler.prototype.getConnection=function(callback){
	pool.getConnection(function(err,conn){
		callback(err,conn);
	});
}

dbHandler.prototype.release=function(conn){
	if(conn === undefined){
		throw new Error("Cant release connection...connection cant be null");
	}
	else{
		conn.release();
	}
}

exports.mysqlpool = (new dbHandler);
exports.mysql=mysql;