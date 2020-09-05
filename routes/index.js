var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('This is an empty page, try /bloggs');
});

module.exports = router;