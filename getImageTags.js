"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise-native");
async function getImageTags(imageURL) {
    let options = {
        method: "POST",
        url: "https://westus.api.cognitive.microsoft.com" + "/vision/v1.0/analyze?visualFeatures=Tags&oauth_consumer_key=" + process.env.COMPUTER_VISION_API_KEY1,
        headers: {
            "content-type": "application/json",
            "ocp-apim-subscription-key": process.env.COMPUTER_VISION_API_KEY2,
            "cache-control": "no-cache",
        },
        json: {
            "url": imageURL
        }
    };
    let data = await rp(options);
    return data["tags"].map(element => element["name"]);
}
exports.getImageTags = getImageTags;
