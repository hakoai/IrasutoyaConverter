"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise-native");
let options = {
    method: "POST",
    url: "westus.api.cognitive.microsoft.com",
    path: "/vision/v1.0/analyze?visualFeatures=Tags&oauth_consumer_key=" + process.env.COMPUTER_VISION_API_KEY1,
    headers: {
        "content-type": "application/json",
        "ocp-apim-subscription-key": process.env.COMPUTER_VISION_API_KEY2,
        "cache-control": "no-cache",
    }
};
async function getImageTags(imageURL) {
    let result = await rp(options);
    let data = JSON.parse(result.body);
    return data["tags"].map(element => element["name"]);
}
exports.getImageTags = getImageTags;
