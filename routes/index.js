var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', function (req, res, next) {
  console.log("hello");
  console.log(req.body);
  var data = {};
  data.name = req.body.name;
  data.category = req.body.category;
  data.location = { "type": "Point", "coordinates": [parseFloat(req.body.long), parseFloat(req.body.lat)] };

  MongoClient.connect('mongodb://localhost:27017/map', function (err, db) {
    if (err) console.log('db error');

    //var restaurants=db.collection('restaurants');

    var query = { name: data.name };
    var options = { upsert: true };
    db.collection('locations').update(query, data, options, function (err, item) {
      if (err) console.log(err);
      console.dir(item);

      res.send('updated');

    })
  })

  //res.render('index', { title: 'Express' });
});
module.exports = router;
