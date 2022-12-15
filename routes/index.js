var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({
    statusCode: 200,
    message: 'Success'
  });;
});

module.exports = router;
