import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => { 
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie('token', token, {
        httpOnly: true, // prevents XSS attacks cross-site scripting attacks
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        sameSite: 'strict', // CSRF attacks Cross-Site Request Forgery attacks
        secure: process.env.NODE_ENV === 'production' ? true : false // cookie will only be set in https
    });

    return token;
}

export default generateTokenAndSetCookie;