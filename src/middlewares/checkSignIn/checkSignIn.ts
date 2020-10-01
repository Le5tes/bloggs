var createError = require('http-errors');

export const checkSignIn = (res,req, next) => {
    if (res.session.user) {
        next();
    }
    throw createError(401, 'Not logged in.')
}