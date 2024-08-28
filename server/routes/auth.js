const express = require('express');
const router = express.Router();


// user signin POST route for fake login data
router.post('/signin', (req, res, next) => {
    const { email, password } = req.body;

    // there is no specific logic here as user should login using any email address and password
    if (email && password) {

        // setting cookie to rememebr user's login status
        res.cookie('user', email, { httpOnly: true });
        return res.status(200).json({ message: 'Sign in successful', redirectUrl: '/home' });
    } else {
        return res.status(400).json({ message: 'Email and password required' });
    }
});

module.exports = router;
