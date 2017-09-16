const request = require('request');

// アクセストークン取得
function getAccessToken(callback) {
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/jwt',
        'Ocp-Apim-Subscription-Key': 'ほげほげ'
    };
    let options = {
        url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
        method: 'POST',
        headers: headers,
        json: true
    };

    request(options, function(err, res) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else
            callback(null, res.body);
    });
}

// 翻訳 (日本語 -> 英語)
function translate2(token, text, callback) {
    let base_url = 'https://api.microsofttranslator.com/v2/http.svc/Translate',
        appid = 'Bearer ' + token,
        from = 'en',
        to = 'ja';

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

    request(options, function(err, res) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else
            callback(null, res.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''));
    });

}

// 実行
export class translate {
    static translateGo(text, callback) {

        getAccessToken(function(err, token) {
            if (!err) {
                // console.log(token);
                translate2(token, text, (err, translated) => {
                    if (!err)
                        callback(translated);
                });
            }
        });
    }
}