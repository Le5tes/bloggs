import session from 'express-session';
import express from 'express';
import {default as request} from 'supertest';
import { getApp } from '../../src/app';

describe('/images', () => {
    let server;
    let app;

    beforeEach(async() => {
        server = await getApp();
        app = request(server);
    });

    describe('GET /images', () => {
        it('should be callable', async () => {
            const res = await app.get('/images');
            expect(res.status).toEqual(303);
        }, 10000);
    });

    describe('GET /images/uploadUrl', () => {
        it('should be callable', async () => {
            const res = await mockLoggedInApp('Tim').get('/images/uploadUrl');
            expect(res.status).toEqual(200);
        }, 10000);
    });

    const mockLoggedInApp = (username) => {
        const mockApp = express();
        mockApp.use(session({secret: 'test'}));
        mockApp.all('*', function(req, res, next) {
            req.session.user = {username: username};
            next();
        });
        mockApp.use(server);

        return request(mockApp);
    }
});
