var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('admin/index', {});
});


router.post('/positions', function(req, res, next) {
	// var db = req.db;
 //  	var students = db.get('people');
	// students.insert({"name": req.body.user, "age": req.body.user_age}, function(err, docs){
	// 	if(err){
	// 		res.send("There was a problem");
	// 	}else{
	// 		res.redirect("/users");
	// 	}
	// });
});

router.post('/kerberos', function(req, res, next) {
	var voters = req.db.get('voters');
	var kerberosList = req.body.kerberos.split("\n");

	voters.remove({});

	for(var i=0; i<kerberosList.length; i++) {
  		voters.insert({"kerberos": kerberosList[i], "voted": false}, function(err, docs){
  		});
  	}

  	voters.find({}, function(err, docs){
  		console.log(docs);
  	});

  /*router.mailer.send('email', {
	    to: 'ldaquila@mit.edu', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
	    subject: 'Test Email', // REQUIRED.
	    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
	  }, function (err) {
	    if (err) {
	      console.log(err);
	    } else {
	    	console.log("success!");
	    }
	});*/

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
