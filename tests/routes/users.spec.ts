import {default as request} from 'supertest';
import { getApp } from '../../src/app';

describe('/users', () => {
    let app;
    let server;
    beforeEach(async() => {
        server = await getApp();
        app = request(server)
    })

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
});
