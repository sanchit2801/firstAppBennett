var mailer = require("nodemailer");
var transporter = require('nodemailer-smtp-transport');
var xoauth2 = require('xoauth2');
var fs = require('fs');
var configObj=require("../config/configLoader").configObj;

var smtpTransport=undefined;
/*
 var refreshToken='1/-CRaspgMtun14WMAL8NKCLy6MJui6vGn7QQ6LuoqxFQ',accessToken='ya29.Ci-0A9hOYGvYrnAjeqkojpnaIglVChilJ3gF43yRNzD1BB7rR_k-7S42W0kfpDeT2Q';
 */
var refreshToken=
    '1/nZDBtHJB4xRt0bFNaTJLUtFZNkjs9Xn5qV9ruPV5rtgD2eFAL51UlDmpwvAwAZA3',accessToken='ya29.GlsHBLZLJz2718O6WpzsneLSwkJIxoOi-u2vjRAiU5yjRNhajIaVfnuaOgCWx0TcIvrVTJCMkJJwc7UTSq34ppX18-6Cu3N-1FBENOS6zQh3kAPWNaknlaRzSU6u';

var xoauthGenListner=xoauth2.createXOAuth2Generator({
    user: configObj.adminEmail.email,
    // clientId: '1041458392257-a2t6fnsh8uo0li0gf9htqdtnhun7cptf.apps.googleusercontent.com',
    //clientSecret: 'aOhfuXed9yPuDQFqKEt8gtpj',
    clientId:'408496327092-82m8ifoa4omm3ujn5lbnsm9i6pcte3l2.apps.googleusercontent.com',
    clientSecret:'UAGHk2MHnv7XQMR8L35Y2qJh',
    refreshToken:refreshToken ,
    scope: 'https://mail.google.com/'
})

// listen for token updates (if refreshToken is set)
// you probably want to store these to a db
xoauthGenListner.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);

    accessToken=token.accessToken;
    refreshToken=token.refreshToken;
});



var emailHandler = {
    init:function(){

        smtpTransport=mailer.createTransport({
            service: 'gmail',
            pool: true,
            auth: {
                xoauth2:xoauthGenListner
            }
        });

        //this.sendEmailTest();

    },
    sendEmailTemplate : function(template,fromEmail,toEmail,subject,callback){
        //var content = fs.readFileSync ( 'welcomeEmailTemplate.html' ,  'utf8' );
        //$ = cheerio.load(content);

        //$('#username').text(username);
        emailHandler.init();

        console.log("from email "+fromEmail);
        var mail={
            from: 	fromEmail,
            to  :    toEmail,
            subject: subject,
            html:    template
        }

        console.log("json "+JSON.stringify(mail));
        smtpTransport.sendMail(mail, function(err, response){
            var respJson={"code":0,"msg":""};
            if(err){
                respJson.code=0;
                respJson.msg="Error in sending email to "+toEmail.toString();

                console.log("ss "+JSON.stringify(err));
                callback(null,respJson);
            }else{
                console.log("Message sent: " + response.message);
                respJson.code=1;
                respJson.msg="Email is Successfully send to "+toEmail.toString();

                callback(null,respJson);
            }
            smtpTransport.close();
        })
    }
}
//emailHandler.init();


exports.mailer = mailer;
//exports.smtpTransport = smtpTransport;
exports.emailHandler = emailHandler;
