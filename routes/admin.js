var express = require('express');
var router = express.Router();
var os = require('os');

router.get('/', function(req, res) {
	res.render('admin/index', {});
});


router.post('/positions', function(req, res, next) {
	var db  = req.db;
	var ballot = db.get('ballot');
	ballot.remove();
	var input = req.body.positions;
	var lines = input.split(os.EOL);
	for (var i=0; i<lines.length; i++){
		line = lines[i].split(":");
		var position = line[0];
		var candidateList = line[1].split(";");
		for (var j=0; j<candidateList.length; j++){
			var candidate = candidateList[j];
			ballot.insert({"position": position, "candidate": candidate, "vote1": 0, "vote2":0}, function(err, entry){});			
		}
	}
	ballot.find({}, function(err, wholeBallot){
		console.log(wholeBallot);
	});	
})
router.post('/kerberos', function(req, res, next) {





	// students.insert({"name": req.body.user, "age": req.body.user_age}, function(err, docs){
	// 	if(err){
	// 		res.send("There was a problem");
	// 	}else{
	// 		res.redirect("/users");
	// 	}
	// });
});

module.exports = router;
