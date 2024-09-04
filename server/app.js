import createError from 'http-errors';
import express, { json, urlencoded} from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";
import path from 'path';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import testApiRouter from './routes/testAPI.js';
// import testDBRouter from "./routes/testDB";
import authRouter from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

// app.use('/', indexRouter);
app.get('/', (req, res) => { 
  res.send('this is the index page');
});

app.use('/users', usersRouter);
app.use('/testAPI', testApiRouter);
// app.use("/testDB", testDBRouter);
app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
