import { UsersController } from "../../src/controllers/users-controller";
import { UsersService } from "../../src/services/users-service";
import { User } from "../../src/models/user";

describe('UsersController', () => {
    let controller: UsersController;
    let service;
    let mockReq;
    let mockRes;

    beforeEach(() => {
        service = {createUser: jest.fn(), login: jest.fn()} as unknown as UsersService;
        controller = new UsersController(service);

        mockReq = {
            body: {username: 'Bob', password: 'Password'},
            session: {destroy: jest.fn()}
        }

        mockRes = {
            status: jest.fn(),
            send: jest.fn()
        }

        mockRes.status.mockImplementation(() => mockRes);
    });

    it('should be created', () => {
        expect(controller).toBeTruthy();
    });

    describe('post', () => {
        it('should call the create user method on the service', async () => {
            await controller.postUser(mockReq, mockRes);

            expect(service.createUser).toHaveBeenCalledWith('Bob', 'Password');
        });

        it('should set the res status as "201" and send', async () => {
            service.createUser.mockImplementation(() => Promise.resolve())

            await controller.postUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.send).toHaveBeenCalled();
        });
    });

    describe('login', () => {
        it('should call login on the service', async () => {
            await controller.login(mockReq, mockRes);

            expect(service.login).toHaveBeenCalledWith('Bob', 'Password')
        });

        it('should set the user in the session', async () => {
            const myUser = await User.create('Bob', 'Password')
            service.login.mockImplementation(() => Promise.resolve(myUser));

            await controller.login(mockReq, mockRes);

            expect(mockReq.session.user).toEqual(myUser);
        });

        it('should set res status as 200 and send', async () => {
            service.login.mockImplementation(() => User.create('Bob', 'Password'));

            await controller.login(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.send).toHaveBeenCalled();
        });
    });

    describe('logout', () => {
        it('should destroy the session', () => {
            controller.logout(mockReq, mockRes);

            expect(mockReq.session.destroy).toHaveBeenCalled();
        });

        it('should set res status as 200 and send', () => {
            controller.logout(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.send).toHaveBeenCalled();
        });
    });
});