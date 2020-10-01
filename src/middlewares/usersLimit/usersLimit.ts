export const checkMoreUsersAllowed = (req, res, next) => {
    if (process.env.NO_MORE_USERS) {
        throw createError(403, 'No more users allowed on this server!');
    }

    next();
}