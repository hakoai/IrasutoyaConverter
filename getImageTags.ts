import * as http from 'https'

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

export async function getImageTags(imageURL:string) {
  return new Promise<string[]>((resolve, reject) =>{
    let req = http.request(options, function (res) {
      let chunks:Buffer[] = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk as Buffer);
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
  })
}
