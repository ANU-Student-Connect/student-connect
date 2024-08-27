const express = require('express');
const router = express.Router();

router.post('/signin', (req, res, next) => {
    const { email, password } = req.body;

    if (email && password) {
        res.cookie('user', email, { httpOnly: true });
        return res.status(200).json({ message: 'Sign in successful', redirectUrl: '/home' });
    } else {
        return res.status(400).json({ message: 'Email and password required' });
    }
});

module.exports = router;
