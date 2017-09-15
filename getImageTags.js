var http = require("https");

var options = {
  "method": "POST",
  "hostname": "westus.api.cognitive.microsoft.com",
  "port": null,
  "path": "/vision/v1.0/analyze?oauth_consumer_key=&ほげほげ",
  "headers": {
    "content-type": "application/json",
    "ocp-apim-subscription-key": "ほげほげ",
    "cache-control": "no-cache",
    "postman-token": "ほげほげ"
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
       var resultMap = data["tags"].map(element => element["name"])
      callback(resultMap);
    });
  });
  req.write(JSON.stringify({ url: imageURL }));
  req.end();
}

exports.getImageTags = getImageTags;