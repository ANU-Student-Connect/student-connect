import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    res.send('API is working');
});

export default router;