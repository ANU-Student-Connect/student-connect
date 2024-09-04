import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => { 
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });
    res.cookie('token', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // XSS attack protection
        sameSite: 'strict', // CSRF attack protection
        secure: process.env.NODE_ENV !== 'development' ? true : false
    });
};

export default generateTokenAndSetCookie;