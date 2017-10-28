"use strict";
exports.__esModule = true;
var request = require('request');
// アクセストークン取得
function getAccessToken(callback) {
    var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/jwt',
        'Ocp-Apim-Subscription-Key': process.env.TRANSLATOR_API_KEY_2
    };
    var options = {
        url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
        method: 'POST',
        headers: headers,
        json: true
    };
    request(options, function (err, res) {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        else
            callback(null, res.body);
    });
}
// 翻訳 (日本語 -> 英語)
function translate2(token, text, callback) {
    var base_url = 'https://api.microsofttranslator.com/v2/http.svc/Translate', appid = 'Bearer ' + token, from = 'en', to = 'ja';
    var url = base_url + '?appid=' + appid +
        '&text=' + text + '&from=' + from + '&to=' + to;
    var headers = {
        'Accept': 'application/xml'
    };
    var options = {
        url: encodeURI(url),
        method: 'get',
        headers: headers,
        json: true
    };
    request(options, function (err, res) {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        else
            callback(null, res.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''));
    });
}
// 実行
var translate = /** @class */ (function () {
    function translate() {
    }
    translate.translateGo = function (text, callback) {
        getAccessToken(function (err, token) {
            if (!err) {
                // console.log(token);
                translate2(token, text, function (err, translated) {
                    if (!err)
                        callback(translated);
                });
            }
        });
    };
    return translate;
}());
exports.translate = translate;
