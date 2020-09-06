const server = require('../../src/app')
import {default as request} from 'supertest';

describe('/bloggs', () => {
    describe('GET /bloggs', () => {
        it('should be callable', () => {
            request(server).get('/bloggs')
            .end((err, res) => {
                expect(err).not.toBeTruthy();
                expect(res.status).toEqual(200);
            });
        });
    });

    describe('POST /bloggs', () => {
        it('should be callable', () => {
            request(server).post('/bloggs')
            .send()
            .end((err, res) => {
                expect(err).not.toBeTruthy();
                expect(res.status).toEqual(200);
            });
        });
    });
});