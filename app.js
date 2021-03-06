"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const builder = require("botbuilder");
const irasutoya = require("./irasutoya");
const getImageTags_1 = require("./getImageTags");
const transrator_1 = require("./transrator");
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
    try {
        session.send("%s を受け取ったよ", session.message.text);
        // Slackから受け取ったメッセージはURLが<>で囲まれるためトリミングを行います
        let url = session.message.text.replace(/(^<)|(>$)/g, "");
        let tags = await getImageTags_1.getImageTags(url);
        let result = await Promise.all(tags.slice(0, 3).map(async (word) => {
            let wordJa = await transrator_1.translate.translateGo(word);
            return idb.query(wordJa).slice(0, 2).map((r) => [wordJa, r]);
        }));
        [].concat.apply([], result).map(([keyword, r]) => {
            session.send("%s で検索したよ。%s があったよ～。%s", keyword, r.name, r.detail_url);
            session.send("%s", r.image_url);
        });
    }
    catch (e) {
        console.log(e);
    }
});
