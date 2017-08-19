var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = [
  	{id: 1, fname: 'this', lname: 'guy'},
  	{id: 2, fname: 'another', lname: 'guy'},
  	{id: 2, fname: 'some', lname: 'guy'},
  ]
  res.send(users);
  // res.send('respond with a resource');
});

module.exports = router;
