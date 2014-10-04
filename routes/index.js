var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index/index', { title: 'Home' });
});

/* POST home page. */
router.post('/', function(req, res) {
  res.render('index/index', { title: 'Home' });
});

module.exports = router;
