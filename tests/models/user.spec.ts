import {User} from '../../src/models/user';
import * as config from '../../config/config';

describe('User', () => {
    let user: User;
    let stubPasswordHasher: jest.SpyInstance;
    let stubPasswordCompare: jest.SpyInstance;

    it('should initialise with a username and password', () => {
        expect(new User()).toBeTruthy();
    });

    describe('.create', () => {
        beforeEach(async() => {
            stubPasswordHasher = jest.spyOn(User.passwordHasher, 'hash').mockImplementation(() => 'hashhhh');
            user = await User.create('Bob', 'Pas5w0rd');
        });

        it('should store the username', () => {
            expect(user.username).toEqual('Bob');
        });

        it('should call BCrypt and store the password hash', () => {
            expect(stubPasswordHasher).toHaveBeenCalledWith('Pas5w0rd', config.bcryptSaltRounds);
            expect(user.passwordHash).toEqual('hashhhh');
        });
    });

    describe('#authenticate', () => {
        beforeEach(async() => {
            stubPasswordHasher = jest.spyOn(User.passwordHasher, 'hash').mockImplementation(() => 'hashhhh');
            stubPasswordCompare = jest.spyOn(User.passwordHasher, 'compare').mockImplementation(() => true);
            user = await User.create('Bob', 'Pas5w0rd');
        });

        it('should return if the password matches', async () => {
            expect(await user.authenticate('Pas5w0rd')).toEqual(true);
            expect(stubPasswordCompare).toHaveBeenCalledWith('Pas5w0rd', 'hashhhh');
        })
    });
});
