var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongoskin');
var crypto = require('crypto')
/* GET home page. */
router.get('/', function(req, res, next) {


MongoClient.connect('mongodb://localhost:27017/restaurant',function (err,db) {
if(err)console.log('db error');

//var restaurants=db.collection('restaurants');

var query= {};
db.collection('restaurant').findOne(query,function (err,item) {
if(err)console.log(err);
console.log(item);

res.send('hello');

})
})
});
module.exports = router;
