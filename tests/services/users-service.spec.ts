import { UsersService } from "../../src/services/users-service";
import { User } from "../../src/models/user";

describe('UsersService', () => {
    let service;
    let datamapper;
    let stubPasswordHasher;
    let stubPasswordCompare;

    beforeEach(() => {
        datamapper = {get: jest.fn(), put: jest.fn(), query: jest.fn()};

        service = new UsersService(datamapper);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('createUser', () => {
        beforeEach(() => {
            datamapper.query.mockImplementation(() => []);
            stubPasswordHasher = jest.spyOn(User.passwordHasher, 'hash').mockImplementation(() => 'hashhhh');
            stubPasswordCompare = jest.spyOn(User.passwordHasher, 'compare').mockImplementation(() => true);
        });

        it('should make a call with the username to check that there isn\'t already a user with the username', async () => {
            await service.createUser('Bob', 'Pas5w0rd');

            expect(datamapper.query).toHaveBeenCalledWith(User, {username: 'Bob'});
        });

        it('should throw an error if the username is already taken', async() => {
            datamapper.query.mockImplementation(() => [User.create('Bob', '1278987654')]);

            await expect(() => service.createUser('Bob', 'Pas5w0rd')).rejects.toThrow();
        });

        it('should create the user if the username is available', async() => {
            await service.createUser('Bob', 'Pas5w0rd');

            expect(datamapper.put).toHaveBeenCalled();
        });
    });
});