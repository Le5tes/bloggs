

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var cors = require('cors')

var indexRouter = require('./routes/index');
import { getUsersRoutes } from "./routes/users";
import { getBloggsRoutes } from "./routes/bloggs";
import { sessionOptions } from "./configs/session-options";
import { getImagesRoutes } from "./routes/images";


export const getApp = async () => {
  var app = express();

  // TODO set some cors
  app.use(cors({origin: /lestes\.tech/}))

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(session(sessionOptions));

  const [usersRoutes, bloggsRoutes] = await Promise.all([getUsersRoutes(), getBloggsRoutes()]);
  const imagesRoutes = getImagesRoutes();

  app.use('/', indexRouter);
  app.use('/users', usersRoutes);
  app.use('/bloggs', bloggsRoutes);
  app.use('/images', imagesRoutes);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(`Error encountered: ${err.message}`);
    if (err.status == 500 || !err.status) console.log(err.stack)

    res.status(err.status || 500).send(err.message || 'Something went wrong :(');
  });

  return app;
}
