var session = require('express-session');
var DynamoDBStore = require('connect-dynamodb')(session);

export const sessionOptions = process.env.PRODENV ? {
    store: new DynamoDBStore(),
    secret: process.env.sessionSecret,
    cookie: { domain: process.env.domain }
} : { secret: 'keyboard cat'};