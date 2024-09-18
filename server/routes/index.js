var express = require('express');
const userRoutes = require('./userRoutes');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRoutes);

module.exports = router;
