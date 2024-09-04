import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send('index', { title: 'Express' });
  // res.send('this is the index page');
  console.log('this is the index page');
});

export default router;
