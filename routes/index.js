var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res) {
  var voters = req.db.get('voters');
  voters.find({"_id": req.params.id.toString()}, function(err, docs){
  	if(docs.length == 0){
  		res.send("Page not found.");
  	} else if(docs[0].voted) {
  		res.send("Thanks for voting.");
  	}
  	else{
  		res.render('index/index');
  	} 
  });
});

/* GET home page. */
router.get('/', function(req, res) {
	
});

/* POST home page. */
router.post('/:id', function(req, res) {
  // Process voting
  voters.find({"_id": req.params.id.toString()}, function(err, docs){
  	docs[0].voted = true;
  });
  res.send("Thanks for voting.");
});

module.exports = router;
