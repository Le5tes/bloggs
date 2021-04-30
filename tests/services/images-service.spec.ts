import { ImagesService } from "../../src/services/images-service";

describe('ImagesService', () => {
    let service;
    let s3;
    const signedUrl = "A url"
    beforeEach(() => {
        s3 = {getSignedUrl: jest.fn()};
        s3.getSignedUrl.mockImplementation(() => signedUrl);
        service = new ImagesService(() => s3);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#getImageUrl', () => {
        it('should call to get the presigned url with the filename', () => {
            const filename = 'myfile.jpg';

            const response = service.getImageUrl(filename);

            expect(s3.getSignedUrl).toHaveBeenCalledWith('getObject', {
                Bucket: process.env.BUCKET_NAME,
                Key: filename,
                Expires: 100
            });
            expect(response).toEqual(signedUrl);
        });
    });

    describe('#getUploadUrl', () => {
        it('should call to get the presigned url with the filename', () => {
            const filename = 'myfile.jpg';

            const response = service.getUploadUrl(filename);

            expect(s3.getSignedUrl).toHaveBeenCalledWith('putObject', {
                Bucket: process.env.BUCKET_NAME,
                Key: filename,
                Expires: 100
            });
            expect(response).toEqual(signedUrl);
        });
    });
});
