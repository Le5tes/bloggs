import {default as request} from 'supertest';
import { getApp } from '../../src/app';

describe('/bloggs', () => {
    let server;

    beforeEach(async() => {
        server = await getApp();
    })

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