import session from 'express-session';
import express from 'express';
import {default as request} from 'supertest';
import { getApp } from '../../src/app';

describe('/users', () => {
    let app;
    let server;
    beforeEach(async() => {
        server = await getApp();
        app = request(server)
    });

    describe('GET /users', () => {
        it('should return 401 if user is not logged in', async() => {
            const res = await app.get('/users/loggedIn');

            expect(res.status).toEqual(401);
        });

        it('should return 200 with the user if logged in', async() => {
            const res = await mockLoggedInApp('Tim').get('/users/loggedIn');

            expect(res.status).toEqual(200);
            expect(res.body).toEqual({user: 'Tim'});
        });
    });

    describe('POST /users', () => {
        it('should be return 201 for valid request', async() => {
            const res = await app.post('/users')
                .send({
                    username: "bob",
                    password: "password!!"
                });

            expect(res.status).toEqual(201);
        }, 10000);

        describe('username validations', () => {
            it('should be return 400 if username is not valid', async () => {
                const res = await app.post('/users')
                    .send({
                        username: "234987 adpo &",
                        password: "password!!"
                    });

                expect(res.status).toEqual(400);
            }, 10000);
        });
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
