var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res) {
  var voters = req.db.get('voters');
  var ballot = req.db.get('ballot');
  var positionNames = req.db.get('positionNames');

 	ballot.find({}, function(err,result){
		console.log(result);
	});

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
              /*console.log("ballotList");
              console.log(ballotList);*/
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
	var positions = req.db.get('positionNames');
	var ballot = req.db.get('ballot');
	console.log(req.body);
	for (var key in req.body) {
		var position = key;
		var candidate = req.body[key];
		console.log(position);
		console.log(candidate);
		if(candidate !== "writein" && position !== "writein") {
			findAndUpdate(position, candidate, ballot);
		} else if (candidate === "writein") {
			addInWritein(position, req.body.writein, ballot);
		}
		
	}

  	// Process voting
  	/*var voters = req.db.get('voters');
	voters.update({"_id": req.params.id.toString()},
		{$set:{"voted":true}}, function(err,result){
	});*/
  	res.send("Thanks for voting.");
});

function findAndUpdate(position, candidate, ballot) {
	var pos = position.substring(0, position.length - 1);
	var ranking = position.substring(position.length-1);

	ballot.find({"position":pos, "candidate":candidate}, function(err,result){
		var position = position;
		if (result.length == 0) {
			return;
		}
		if (ranking == 1) {
			var newVote = result[0].vote1+1;
			ballot.update({"position":pos, "candidate":candidate},
				{$set:{"vote1":newVote}}, function(err,result){
			});
		} else {
			var newVote = result[0].vote2+1;
			ballot.update({"position":pos, "candidate":candidate},
				{$set:{"vote2":newVote}}, function(err,result){
			});
		}

	});
}

function addInWritein(position, candidate, ballot) {
	var pos = position.substring(0, position.length - 1);
	var ranking = position.substring(position.length-1);

	if (ranking == 1) {
		candidate = candidate[0];
		ballot.insert({"position": position, "candidate": candidate, "vote1": 1, "vote2":0}, function(err, entry){});
	} else {
		candidate = candidate[1];
		ballot.insert({"position": position, "candidate": candidate, "vote1": 0, "vote2":1}, function(err, entry){});
	}
}

module.exports = router;
