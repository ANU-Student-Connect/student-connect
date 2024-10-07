var express = require('express');
const userRoutes = require('./userRoutes');
const interestRoutes = require('./interestRoutes');
const questionRoutes = require('./questionRoutes');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRoutes);
router.use('/interests', interestRoutes);
router.use('/questions', questionRoutes);

module.exports = router;
