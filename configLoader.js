var config=require("./config");
var configOb=undefined;
var getConfigObj = function(){
	console.log("environament "+process.env.NODE_ENV);
    var env=process.env.NODE_ENV;
    if(!(env === undefined)){
        env=env.trim();
    }

    var configTemp=undefined;

    switch(env){
        case 'dev':
            configTemp= config["dev"];
            break;
		case 'prod':
            console.log("prod");
            configTemp= config["prod"];
            break;
        default:
            configTemp= config["local"];
	}

    //console.log(" "+JSON.stringify(config["prod"]));
    configOb=configTemp;
}


getConfigObj();

//console.log("JSON.stringify() "+JSON.stringify(configOb));
module.exports.configObj=configOb;