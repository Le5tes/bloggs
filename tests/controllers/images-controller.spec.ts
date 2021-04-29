import { ImagesController } from "../../src/controllers/images-controller";

describe('ImagesController', () => {
  let controller: ImagesController;
  let service;

  let mockReq;
  let mockRes;

  beforeEach(() => {
    service = { getImageUrl: jest.fn(), getUploadUrl: jest.fn() };
    controller = new ImagesController(service);

    mockReq = {
      query: {filename: 'file.jpg'}
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

  describe('getImage', () => {
    it('should call the service for a presigned url', () => {
      controller.getImage(mockReq, mockRes);

      expect(service.getImageUrl).toHaveBeenCalledWith('file.jpg');
    });
  });

  describe('getUploadUrl', () => {
    it('should call the service for a presigned url', () => {
      controller.getUploadUrl(mockReq, mockRes);

      expect(service.getUploadUrl).toHaveBeenCalledWith('file.jpg');
    });
  });
});