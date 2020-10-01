import { BloggsService } from "../../src/services/bloggs-service";
import { Blogg } from "../../src/models/blogg";

describe('BloggsService', () => {
    let service;
    let datamapper;

    beforeEach(async() => {
        datamapper = {get: jest.fn(), put: jest.fn(), query: jest.fn(), ensureTableExists: jest.fn()};
        datamapper.ensureTableExists.mockImplementation(() => new Promise(res => res()));

        service = await BloggsService.create(datamapper);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should ensure the table exists', () => {
        expect(datamapper.ensureTableExists).toHaveBeenCalledWith(Blogg, {"readCapacityUnits": 5, "writeCapacityUnits": 5});
    });

    describe('createBlogg', () => {
        it('should create a new blog', () => {
            service.createBlogg('Bob', 'This is a blogggggggg');

            expect(datamapper.put).toHaveBeenCalled();
        });
    });
});
