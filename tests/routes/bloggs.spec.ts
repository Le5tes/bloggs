const server = require('../../src/app')
import {default as request} from 'supertest';

describe('/bloggs', () => {
    describe('GET /bloggs', () => {
        it('should be callable', async() => {
            const res = await request(server).get('/bloggs')
            expect(res.status).toEqual(200);
        }, 10000);
    });

    describe('POST /bloggs', () => {
        it('should be callable', async () => {
            const res = await request(server).post('/bloggs').send()
            expect(res.status).toEqual(200);
        }, 10000);
    });
});