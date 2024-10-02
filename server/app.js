const { auth } = require('express-openid-connect');
require('dotenv').config(); // To load environment variables from .env file


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testApiRouter = require('./routes/testAPI');
var testDBRouter = require("./routes/testDB");
var authRouter = require("./routes/auth");

const mongoose = require('mongoose');
const routes = require('./routes/index'); 
const dbConfig = require('./config/dbConfig'); 

var app = express();

mongoose.connect(dbConfig.url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,  
  baseURL: 'http://localhost:9000',
  clientID: 'LJKVeegBb7wFMy7kxHU71QBbrHrzPmNf',  
  issuerBaseURL: 'https://dev-sghfq7xzj3g363t2.au.auth0.com' 
};

// auth0 middleware to handle login, logout, and callback routes
app.use(auth(config));


app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testApiRouter);
app.use("/testDB", testDBRouter);
app.use('/auth', authRouter);
app.use('/api', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
