var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res) {
  var voters = req.db.get('voters');
  voters.find({"_id": req.params.id.toString()}, function(err, docs){
  	if(docs.length != 0 && !docs[0].voted){
  		res.render('index/index', { title: 'Good' });
  	} else {
  		res.send("There was a problem");
  	}
  });
});

/* GET home page. */
router.get('/', function(req, res) {
	
});

/* POST home page. */
router.post('/', function(req, res) {
  res.render('index/index', { title: 'Home' });
});

module.exports = router;
