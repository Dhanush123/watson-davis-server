var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
var fs = require('fs');
var imgs = [];
var params = {"images_file": ""};
var request = require('request').defaults({ encoding: null });
var Firebase = require('firebase');
var rootRef = new Firebase("http://amber-torch-1365.firebaseio.com");

var imgArrayLength;
/* GET home page. */
router.post('/', function(req, res, next) {
    var imgArray = req.body["imgArray[]"];
    imgArrayLength = imgArray.length;
    var i = 0;
    //var array = req.params.
    for(var x in imgArray ){
        console.log(imgArray[x]);
        if (imgArray[x][0] == "h"){
        request.get(imgArray[x])
            .on('response', function(response){
            
        })
            .pipe(fs.createWriteStream('image.jpg').on('error', function(err){conosle.log('error');}))
            .on('close', 
          function(){
            if (fs.createReadStream('image.jpg'))
                params.images_file = fs.createReadStream('image.jpg');
            doWatsonImg(imgArray[x]);
          });
    }
}

console.log(imgs[0]);
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

    imgs.push(res.images[0].scores[0].name);
          console.log(imgs);
  }
  if (imgs.length){console.log("images");
    imgs = imgs.filter(function(elem, pos){return imgs.indexOf(elem) == pos;});
    var imageString = "" + imgs[0];
    for (var i = 1; i < imgs.length; i++) {
        imageString += " and " + imgs[i];
    }
    rootRef.set({command: "images", images: imageString});}
});

}

module.exports = router;
