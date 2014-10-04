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

module.exports = router;
