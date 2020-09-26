var server = require('../../src/app')
import {default as request} from 'supertest';

describe('/users', () => {
    let app;
    beforeEach(() => {
        app = request(server)
    })

    describe('POST /users', () => {
        it('should be return 200 for valid request', async() => {
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
