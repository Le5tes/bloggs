import { BloggsService } from "../../src/services/bloggs-service";
import { Blogg } from "../../src/models/blogg";
import { mockAsyncIterator } from "../../src/utils/mock-datamapper";

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

    describe('getBloggs', () => {
        it('should make a call to retrieve the blogs from the datamapper', () => {
            service.getBloggs(3);

            expect(datamapper.query).toHaveBeenCalled();
        });

        it('should return the retrieved blogs', async() => {
            const bloggs = [
                {id: '1111', username: 'Tim', body: 'this is blog', createdAt: new Date()},
                {id: '2222', username: 'Tim', body: 'this is blog', createdAt: new Date()},
                {id: '3333', username: 'Tim', body: 'this is blog', createdAt: new Date()}
            ];
            datamapper.query.mockImplementation(() => {
                return {
                    [Symbol.asyncIterator]:  async function*() {
                        yield bloggs[0];
                        yield bloggs[1];
                        yield bloggs[2];
                    }
                }
            });

            const response = await service.getBloggs(3);

            expect(response).toEqual(bloggs);
        });
    });
});
