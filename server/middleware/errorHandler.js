import { NODE_ENV } from '../config/config.js';

const errorHandler = (err, req, res, next) => { 
    console.error(err);

    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') {
        const message = `Resource not found with this id: ${err.value}`;
        error = { message, statusCode: 404 };
    }

    // Mongoose bad ObjectId
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `Duplicate field value entered: ${field}`;
        error = { message, statusCode: 400 };
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = { message, statusCode: 400 };
    }

    // JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = 'Your token is invalid, please log in again';
        error = { message, statusCode: 401 };
    }
    
    // JWT expired error
    if (err.name === 'TokenExpiredError') {
        const message = 'Your token has expired, please log in again';
        error = { message, statusCode: 401 };
    }
    
    res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message || 'Internal Server Error',
        ...(NODE_ENV === 'development' && { stack: err.stack })
    });
}

export default errorHandler;