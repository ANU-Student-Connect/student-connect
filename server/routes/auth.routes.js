import express from "express";
import {login, logout, signup, verifyEmail, checkAuth, forgotPassword, resetPassword} from "../controllers/auth.controller.js";
import {verifyToken} from "../middleware/verifyToken.js"

const router = express.Router();

router.post('/signup', signup);

router.post('/verify-email', verifyEmail)

router.get('/check-auth', verifyToken, checkAuth)

router.post('/login', login);

router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

export default router;