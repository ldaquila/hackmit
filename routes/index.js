var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res) {
  var voters = req.db.get('voters');
  var ballot = req.db.get('ballot');
  var positionNames = req.db.get('positionNames');
  // Check validity of hash code
  voters.find({"_id": req.params.id.toString()}, function(err, docs){
    // hash code is not valid
  	if(docs.length == 0){
  		res.send("Page not found.");
    // already voted
  	} else if(docs[0].voted) {
  		res.send("Thanks for voting.");
  	}
    // accept voting request
  	else{
      var ballotList = [];

      positionNames.find({}, function(e, positionNames){
        // for each position
        for (var i=0; i<positionNames.length; i++){
          var position = positionNames[i].name;
          ballot.find({"position": position}, function(e, candidateEntry){
            // for each candidate
            candidateList = [];
            for (var j=0; j<candidateEntry.length; j++){
              var position = candidateEntry[j].position;
              var candidate = candidateEntry[j].candidate;
              candidateList.push(candidate);
            }
            ballotList.push([position, candidateList]);
            // when ballotList is fully populated
            if (ballotList.length == positionNames.length){
              console.log("ballotList");
              console.log(ballotList);
              res.render('index//index', { 'ballot': ballotList });
            }

          });

        }
        
      });
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
