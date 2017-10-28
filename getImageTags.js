var http = require("https");

var options = {
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

function getImageTags(imageURL, callback) {
  var req = http.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      var data = JSON.parse(body);
      var resultMap = data["tags"].map(element => element["name"]);
      callback(resultMap);
    });
  });
  req.write(JSON.stringify({ url: imageURL }));
  req.end();
}

exports.getImageTags = getImageTags;