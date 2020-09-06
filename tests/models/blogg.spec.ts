import { Blogg } from '../../src/models/blogg'; 

describe('Blogg', () => {
    it('should initialise', () => {
        expect(new Blogg()).toBeTruthy();
    });
});
