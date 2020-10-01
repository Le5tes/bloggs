import {default as request} from 'supertest';
import { getApp } from '../../src/app';

describe('/', () => {
    let server;

    beforeEach(async() => {
        server = await getApp();
    })
    
    it('should return the default text', async () => {
        const res = await request(server).get('/')

        expect(res.status).toEqual(200);
        expect(res.text).toEqual('This is an empty page, try /bloggs');
    }, 10000);
});
