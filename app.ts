import * as restify from 'restify';
import * as builder from 'botbuilder'

import * as irasutoya from './irasutoya'
import { getImageTags } from './getImageTags'
import {translate} from './transrator'

// Setup Restify Server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
let connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

let idb = new irasutoya.IrasutoyaDb();

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
let bot = new builder.UniversalBot(connector, async function (session) {
    try{
        let tags = await getImageTags(session.message.text);
        let result = await Promise.all(tags.slice(0,3).map(async (word) =>{
            let wordJa = await translate.translateGo(word);
            return await idb.query(wordJa).slice(0,2);
        }));
        [].concat(result).map((r:irasutoya.Irasutoya) =>{
            session.send("%s があったよ～。", r.name);
            session.send("%s", r.detail_url);
        });
    }catch(e){
        console.log(e);
    }
});
