import { BloggsController } from "../../src/controllers/bloggs-controller";

describe('BloggsController', () => {
    let controller;
    let service;

    let mockReq;
    let mockRes;

    beforeEach(() => {
        service = {createBlogg: jest.fn()};
        controller = new BloggsController(service);

        mockReq = {
            body: {blog: 'This is an example blogg!'},
            session: {user: {username: "Bob", passwordHash: "HASHHHHHH"}}
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

    describe('postBlogg', () => {
        it('should call the createBlogg method on the service with the username and blog text', () => {
            controller.postBlogg(mockReq, mockRes);

            expect(service.createBlogg).toHaveBeenCalledWith(mockReq.session.user.username, mockReq.body.blog)
        });

        it('should return 201 status', () => {
            controller.postBlogg(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.send).toHaveBeenCalled();
        });
    });
});
