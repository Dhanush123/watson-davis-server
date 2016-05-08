var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
var fs = require('fs');
var imgs = [];
var params = {};
var request = require('request').defaults({ encoding: null });
/* GET home page. */
router.post('/', function(req, res, next) {
    var imgArray = req.body["imgArray[]"];
    var i = 0;
    //var array = req.params.
    for(var x in imgArray ){
        request.get(imgArray[x], function (error, response, body) {
        if (!error && response.statusCode == 200) {
            params.images_file = body;
            doWatsonImg(imgArray[x])
        }
});

}
console.log(imgs);
res.json({images: imgs});  

});

function doWatsonImg(img) {
var imgString = null;  
    var dialog = watson.dialog({
  version: 'v1',
  use_unauthenticated: true
});

var visual_recognition = watson.visual_recognition({
  version: 'v2-beta',
  version_date: '2015-12-02',
    "url": "https://gateway.watsonplatform.net/visual-recognition-beta/api",
    "password": "Xxf4Mu8BiyQm",
    "username": "f9ce9d55-77c9-42fb-bcd5-a138f3f50a33"
});

visual_recognition.classify(params, function(err, res) {
  if (err)
    console.log(err);
  else{
    imgString = JSON.stringify(res, null, 2); 
    console.log(imgString);
          imgs.push(imgString);
  }

});

}

module.exports = router;
