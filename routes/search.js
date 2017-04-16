var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
/* GET home page. */
router.get('/', function(req, res, next) {
console.log("helooooo");
var data={};
data.name=req.body.name;
data.category=req.body.category;
data.location={"type":"Point","coordinates":[req.body.long,req.body.lat]};

MongoClient.connect('mongodb://localhost:27017/map',function (err,db) {
if(err)console.log('db error');

//var restaurants=db.collection('restaurants');

var query= {name:data.name};
var options={upsert:true};
console.log("long"+req.query.longSrh);

var cursor=db.collection("locations").find({location:{
  $near:{$geometry:{type:"Point",coordinates:[parseFloat(req.query.longSrh),parseFloat(req.query.latSrh)]},
  $maxDistance:20000000
}}});
cursor.each(function(err,d){
    console.log(d);
});
  res.render('index', { long: 'Express' });
});





router.post('/', function(req, res, next) {
console.log("hello");
console.log(req.body);

res.send('updated');

})
})

  //res.render('index', { title: 'Express' });

module.exports = router;
