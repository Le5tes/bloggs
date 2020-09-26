import { UsersService } from "../../src/services/users-service";
import { User } from "../../src/models/user";
import { mockAsyncIterator } from "../../src/utils/mock-datamapper";

describe('UsersService', () => {
    let service;
    let datamapper;
    let stubPasswordHasher;
    let stubPasswordCompare;

    beforeEach(() => {
        datamapper = {get: jest.fn(), put: jest.fn(), query: jest.fn(), ensureTableExists: jest.fn()};

        service = new UsersService(datamapper);
    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('createUser', () => {
        beforeEach(() => {
            datamapper.query.mockImplementation(() => mockAsyncIterator);
            datamapper.ensureTableExists.mockImplementation(() => new Promise(res => res()));
            stubPasswordHasher = jest.spyOn(User.passwordHasher, 'hash').mockImplementation(() => 'hashhhh');
            stubPasswordCompare = jest.spyOn(User.passwordHasher, 'compare').mockImplementation(() => true);
        });

        it('should ensure the users table exists first', async () => {
            await service.createUser('Bob', 'Pas5w0rd');
            
            expect(datamapper.ensureTableExists).toHaveBeenCalledWith(User);
        });

        it('should make a call with the username to check that there isn\'t already a user with the username', async () => {
            await service.createUser('Bob', 'Pas5w0rd');

            expect(datamapper.query).toHaveBeenCalledWith(User, {username: 'Bob'});
        });

        it('should throw an error if the username is already taken', async() => {
            datamapper.query.mockImplementation(() => ({next: () => User.create('Bob', '1278987654').then((val) => ({value: val, done: true}))}));

            await expect(() => service.createUser('Bob', 'Pas5w0rd')).rejects.toThrow();
        });

        it('should create the user if the username is available', async() => {
            await service.createUser('Bob', 'Pas5w0rd');

            expect(datamapper.put).toHaveBeenCalled();
        });
    });
});