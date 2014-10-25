var express = require('express');
var router = express.Router();
var os = require('os');

router.get('/', checkAuth, function(req, res) {
	var voters = req.db.get('voters');
	voters.find({}, function(err, docs){
		console.log(docs);
	});
	res.render('admin/index', {});
});

router.get('/results', checkAuth, function(req, res) {
	var ballot = req.db.get('ballot');
	ballot.find({}, function(err, docs){
		console.log(docs);
		res.render('admin/results', {'results': docs});
	});
});


router.post('/positions', checkAuth, function(req, res, next) {
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
router.post('/kerberos', checkAuth, function(req, res, next) {
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

router.get('/login', function(req, res) {
	res.render('admin/login', {});
});

/* POST login page. */
router.post('/login', function(req, res) {
  if (req.body.password === "ttt") {
  	req.session.user_id = "ttt";
    res.redirect('/admin');
  } else {
  	res.render('admin/login', {  });
  }
});

// checkAuth ensures that a user is logged in. If no user is logged in, redirects to the login page.
function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.redirect("/admin/login");
  } else {
    next();
  }
}

/*function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}*/

module.exports = router;
