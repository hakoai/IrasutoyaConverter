"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("https");
let options = {
    "method": "POST",
    "hostname": "westus.api.cognitive.microsoft.com",
    "port": null,
    "path": "/vision/v1.0/analyze?visualFeatures=Tags&oauth_consumer_key=" + process.env.COMPUTER_VISION_API_KEY1,
    "headers": {
        "content-type": "application/json",
        "ocp-apim-subscription-key": process.env.COMPUTER_VISION_API_KEY2,
        "cache-control": "no-cache",
    }
};
async function getImageTags(imageURL) {
    return new Promise((resolve, reject) => {
        let req = http.request(options, function (res) {
            let chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                let body = Buffer.concat(chunks);
                let data = JSON.parse(body.toString());
                let resultMap = data["tags"].map(element => element["name"]);
                resolve(resultMap);
            });
        });
        req.write(JSON.stringify({ url: imageURL }));
        req.end();
    });
}
exports.getImageTags = getImageTags;
