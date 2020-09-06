var server = require('../../src/app')
import {default as request} from 'supertest';

describe('/', () => {
    it('should return the default text', () => {
        request(server).get('/')
        .send()
        .end((err, res) => {
            expect(err).not.toBeTruthy();
            expect(res.status).toEqual(200);
            expect(res.text).toEqual('This is an empty page, try /bloggs');
        });
    });
});
