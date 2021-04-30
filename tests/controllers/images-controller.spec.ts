import { ImagesController } from "../../src/controllers/images-controller";

describe('ImagesController', () => {
  let controller: ImagesController;
  let service;

  let mockReq;
  let mockRes;
  const signedUrl = "A url"

  beforeEach(() => {
    service = { getImageUrl: jest.fn(), getUploadUrl: jest.fn() };
    service.getImageUrl.mockImplementation(() => signedUrl);
    service.getUploadUrl.mockImplementation(() => signedUrl);
    controller = new ImagesController(service);

    mockReq = {
      query: {filename: 'file.jpg'}
    }

    mockRes = {
      status: jest.fn(),
      set: jest.fn(),
      send: jest.fn()
    }

    mockRes.status.mockImplementation(() => mockRes);
  });

  it('should be created', () => {
    expect(controller).toBeTruthy();
  });

  describe('getImage', () => {
    beforeEach(() => {
      controller.getImage(mockReq, mockRes);
    });

    it('should call the service for a presigned url', () => {
      expect(service.getImageUrl).toHaveBeenCalledWith('file.jpg');
    });

    it('should set the signed url in the Location header and respond with 301 status', () => {
      expect(mockRes.set).toHaveBeenCalledWith('Location', signedUrl);
      expect(mockRes.status).toHaveBeenCalledWith(303);
      expect(mockRes.send).toHaveBeenCalled();
    });
  });

  describe('getUploadUrl', () => {
    beforeEach(() => {
      controller.getUploadUrl(mockReq, mockRes);
    });

    it('should call the service for a presigned url', () => {
      expect(service.getUploadUrl).toHaveBeenCalledWith('file.jpg');
    });

    it('should return the signed url in the body with 200 status', () => {
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({url: signedUrl});
    });
  });
});