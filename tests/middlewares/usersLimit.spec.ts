import { checkMoreUsersAllowed } from "../../src/middlewares/usersLimit/usersLimit";

describe('checkMoreUSersAllowed', () => {
    it('should call the next function when the env variable is undefined or false', () => {
        const next = jest.fn();
        checkMoreUsersAllowed({}, {}, next);

        expect(next).toHaveBeenCalled();
    });

    it('should throw a 403 forbidden if the env variable is true', () => {
        process.env.NO_MORE_USERS = 'true';

        expect(() => checkMoreUsersAllowed({}, {}, () => {})).toThrow();
    });
})