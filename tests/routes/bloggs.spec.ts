import session from 'express-session';
import express from 'express';
import {default as request} from 'supertest';
import { getApp } from '../../src/app';

describe('/bloggs', () => {
    let server;
    let app;

    beforeEach(async() => {
        server = await getApp();
        app = request(server)
    })

    describe('GET /bloggs', () => {
        it('should be callable', async () => {
            const res = await app.get('/bloggs');
            expect(res.status).toEqual(200);
        }, 10000);
    });

    describe('POST /bloggs', () => {
        it('should return 401 if user is not logged in', async() => {
            const res = await app.get('/users/loggedIn');

            expect(res.status).toEqual(401);
        });

        it('should return 201 if the user is logged in', async () => {
            const res = await mockLoggedInApp('Tim').post('/bloggs').send();
            expect(res.status).toEqual(201);
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