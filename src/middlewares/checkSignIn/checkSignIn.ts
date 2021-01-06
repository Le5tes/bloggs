var createError = require('http-errors');

export const checkSignIn = (res,req, next) => {
    if (!res.session.user) {
        throw createError(401, 'Not logged in.')
    }
    next();
}