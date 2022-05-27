import { BloggsController } from "../../src/controllers/bloggs-controller";
import { SilentLogger } from "../utils/silent-logger";

describe('BloggsController', () => {
    let controller;
    let service;

    let mockReq;
    let mockRes;

    beforeEach(() => {
        service = {createBlogg: jest.fn(), getBloggs: jest.fn(), getBloggById: jest.fn()};
        controller = new BloggsController(service);
        controller.logger = SilentLogger;

        mockReq = {
            body: {blog: 'This is an example blogg!', tags: 'blogg, stuff'},
            session: {user: {username: "Bob", passwordHash: "HASHHHHHH"}},
            query: {},
            params: {}
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
        it('should call the createBlogg method on the service with the username and blog text', async () => {
            await controller.postBlogg(mockReq, mockRes);

            expect(service.createBlogg).toHaveBeenCalledWith(mockReq.session.user.username, mockReq.body.body, mockReq.body.tags)
        });

        it('should return 201 status', async () => {
            await controller.postBlogg(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.send).toHaveBeenCalled();
        });
    });

    describe('getBlogg', () => {
        it('should call the getBlogg method on the service with the number passed in the params', () => {
            mockReq.query = {limit: 3}
            controller.getBloggs(mockReq, mockRes);

            expect(service.getBloggs).toHaveBeenCalledWith(mockReq.query.limit);
        });

        it('should call the getBlogg method on the service with 1 if limit query param is not given', () => {
            controller.getBloggs(mockReq, mockRes);

            expect(service.getBloggs).toHaveBeenCalledWith(1);
        });

        it('should send the returned blogs with status 200', async () => {
            const bloggs = [
                {id: '1111', username: 'Tim', body: 'this is blog', createdAt: new Date()},
                {id: '2222', username: 'Tim', body: 'this is blog', createdAt: new Date()},
                {id: '3333', username: 'Tim', body: 'this is blog', createdAt: new Date()}
            ]
            service.getBloggs.mockImplementation(() => Promise.resolve(bloggs));

            mockReq.query = {limit: 3}
            await controller.getBloggs(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.send).toHaveBeenCalledWith(bloggs);
        });
    });

    describe('getBloggById', () => {
        it('should call the getBloggByID method on the service with the id passed in the url param', () => {
            mockReq.params = {id: "abc"}
            controller.getBloggById(mockReq, mockRes);

            expect(service.getBloggById).toHaveBeenCalledWith(mockReq.params.id);
        });


        it('should send the returned blog with status 200', async () => {
            const blogg = {id: 'abc', username: 'Tim', body: 'this is blog', createdAt: new Date()}
            service.getBloggById.mockImplementation(() => Promise.resolve(blogg));

            mockReq.params = {id: "abc"}
            await controller.getBloggById(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.send).toHaveBeenCalledWith(blogg);
        });
    });
});
