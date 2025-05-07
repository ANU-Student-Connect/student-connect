import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';
import User from '../models/user.model.js';

// Protect routes that require authentication
const protectRoute = async (req, res, next) => { 
    try { 
        let token;

        // Check if auth header exists and starts with Bearer
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) { 
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.token) { 
            token = req.cookies.token;
        }

        // Make sure token exists
        if (!token) { 
            return res.status(401).json({
                status: 'error',
                message: "Not authorized to access this route"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) { 
            return res.status(401).json({
                status: 'error',
                message: "Unauthorized - Invalid Token"
            });
        }

        const currentUser = await User.findById(decoded.id);

        if (!currentUser) { 
            return res.status(401).json({
                status: 'error',
                message: "User not found"
            });
        }

        req.user = currentUser;

        await currentUser.updateLastActive();

        next();
    } catch (error) { 
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({
            status: 'error',
            message: "Internal server error"
        });
    }
};

// Protect routes that require a specific role
const restrictTo = (...roles) => { 
    return (req, res, next) => { 
        if (!roles.includes(req.user.role)) { 
            return res.status(403).json({
                status: 'error',
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    }
}

export { protectRoute, restrictTo };