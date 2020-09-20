

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var DynamoDBStore = require('connect-dynamodb')(session);

var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bloggsRouter = require('./routes/bloggs');

var app = express();

// TODO set some cors
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// TODO implement sessions
// app.use(session({
//   store: new DynamoDBStore(),
//   secret: 'CHANGEME'
// }))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bloggs', bloggsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
