"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise-native");
// アクセストークン取得
async function getAccessToken() {
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/jwt',
        'Ocp-Apim-Subscription-Key': process.env.TRANSLATOR_API_KEY2
    };
    let options = {
        url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
        method: 'POST',
        headers: headers,
        json: true
    };
    let result = await rp(options);
    return result;
}
// 翻訳 (日本語 -> 英語)
async function translate2(token, text) {
    let base_url = 'https://api.microsofttranslator.com/v2/http.svc/Translate', appid = 'Bearer ' + token, from = 'en', to = 'ja';
    let url = base_url + '?appid=' + appid +
        '&text=' + text + '&from=' + from + '&to=' + to;
    let headers = {
        'Accept': 'application/xml'
    };
    let options = {
        url: encodeURI(url),
        method: 'get',
        headers: headers,
        json: true
    };
    let result = await rp(options);
    return result.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
}
// 実行
class translate {
    static async translateGo(text) {
        let token = await getAccessToken();
        let result = await translate2(token, text);
        return result;
    }
}
exports.translate = translate;
