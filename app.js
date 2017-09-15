var restify = require('restify');
var builder = require('botbuilder');
var irasutoya = require('./irasutoya');
var getImageTags = require('./getImagetags').getImageTags;
var transrator = require('./transrator').translate;

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

var idb = new irasutoya.IrasutoyaDb();

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    getImageTags(session.message.text, (result) =>{
        result.slice(0, 3).forEach((word) => {
            transrator.translateGo(word, (ja)=>{
                var re = idb.query(ja).slice(0,2).forEach((i) =>{

                    session.send("%s があったよ～。", i.name);
                    session.send("%s", i.detail_url);
                });

            });
        })
    });
    
});
