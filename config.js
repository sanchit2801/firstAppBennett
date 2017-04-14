var configProp={
	"local":{
		"db":{
			"url":"localhost",
			"dbname":"demoApp",
			"username":"root",
			"password":"root"
		}
	},
	"prod": {
		"db": {
			"url": "mobile-ifa.cybrpgpbnkem.ap-southeast-1.rds.amazonaws.com",
			"dbname": "mutual_fund",
			"username": "mobile_ifa",
			"password": "mobile_ifa"
		}
	}
}
module.exports=	configProp;