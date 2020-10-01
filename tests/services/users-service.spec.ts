import { UsersService } from "../../src/services/users-service";
import { User } from "../../src/models/user";
import { mockAsyncIterator } from "../../src/utils/mock-datamapper";

describe('UsersService', () => {
    let service;
    let datamapper;
    let stubPasswordHasher;
    let stubPasswordCompare;

    beforeEach(async() => {
        datamapper = {get: jest.fn(), put: jest.fn(), query: jest.fn(), ensureTableExists: jest.fn()};
        datamapper.ensureTableExists.mockImplementation(() => new Promise(res => res()));

        service = await UsersService.create(datamapper);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make sure the table exists on create', () => {
        expect(datamapper.ensureTableExists).toHaveBeenCalledWith(User, {"readCapacityUnits": 5, "writeCapacityUnits": 5});
    });

    describe('createUser', () => {
        beforeEach(() => {
            datamapper.query.mockImplementation(() => mockAsyncIterator);
            stubPasswordHasher = jest.spyOn(User.passwordHasher, 'hash').mockImplementation(() => Promise.resolve('hashhhh'));
            stubPasswordCompare = jest.spyOn(User.passwordHasher, 'compare').mockImplementation(() => Promise.resolve(true));
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

    describe('login', () => {
        let user;
        beforeEach(() => {
            user = new User();
            datamapper.get.mockImplementation(() => Promise.resolve(user))
        });

        it('should make a call to the database to get the user', async() => {
            await service.login('Bob', 'Password');

            expect(datamapper.get).toHaveBeenCalled();
        });

        it('should return the user if the user sucessfully authenticates',  async() => {
            const result = await service.login('Bob', 'Password');
            expect(result).toEqual(user);
        });
        
        it('should throw an error if the user doesn\'t exist', async() => {
            datamapper.get.mockImplementation(() => Promise.reject())
            
            expect(() => service.login('Bob', 'Password')).rejects.toThrow();
        });

        it('should throw an error if the user\'s password doesn\'t match', () => {
            stubPasswordCompare.mockImplementation(() => Promise.resolve(false));

            expect(() => service.login('Bob', 'Password')).rejects.toThrow();
        });
    });
});