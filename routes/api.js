var router = require('./index.js');
/* GET home page. */
console.log(router);
router.get('/api/course', function(req, res, next) {
  res.send('Course GET request');
});

module.exports = router;
