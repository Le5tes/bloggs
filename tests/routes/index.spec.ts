var server = require('../../src/app')
import {default as request} from 'supertest';

describe('/', () => {
    it('should return the default text', async () => {
        const res = await request(server).get('/')

        expect(res.status).toEqual(200);
        expect(res.text).toEqual('This is an empty page, try /bloggs');
    }, 10000);
});
