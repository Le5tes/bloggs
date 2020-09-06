var server = require('../../src/app')
import {default as request} from 'supertest';

describe('/users', () => {
    describe('POST /users', () => {
        it('should be callable', () => {
            request(server).post('/users')
            .send()
            .end((err, res) => {
                expect(err).not.toBeTruthy();
                expect(res.status).toEqual(200);
            });
        });
    });
});
