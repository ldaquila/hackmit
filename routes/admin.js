var express = require('express');
var router = express.Router();
var os = require('os');

router.get('/', function(req, res) {
	res.render('admin/index', {});
});


router.post('/positions', function(req, res, next) {
	var db  = req.db;
	var ballot = db.get('ballot');
	var positionNames = db.get('positionNames');
	ballot.remove();
	positionNames.remove();
	var input = req.body.positions;
	var lines = input.split(os.EOL);
	for (var i=0; i<lines.length; i++){
		line = lines[i].split(":");
		var position = line[0];
		positionNames.insert({"name": position}, function(err, entry){});			
		var candidateList = line[1].split(";");
		for (var j=0; j<candidateList.length; j++){
			var candidate = candidateList[j];
			ballot.insert({"position": position, "candidate": candidate, "vote1": 0, "vote2":0}, function(err, entry){});			
		}
	}
	ballot.find({}, function(err, wholeBallot){
		console.log(wholeBallot);
	});
	positionNames.find({}, function(err, doc){
		console.log(doc);
	});	
})
router.post('/kerberos', function(req, res, next) {
	var voters = req.db.get('voters');
	var kerberosList = req.body.kerberos.split(os.EOL);

	voters.remove({});

	for(var i=0; i<kerberosList.length; i++) {
  		voters.insert({"kerberos": kerberosList[i], "voted": false}, function(err, docs){
  		});
  	}

  	voters.find({}, function(err, docs){
  		console.log(docs);
  	});


  	res.redirect("/admin");

});

/*function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}*/

module.exports = router;
