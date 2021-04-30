var AWS = require('aws-sdk');

export class ImagesService {
    constructor(private getS3) {}

    getImageUrl(filename) {
        return this.getS3().getSignedUrl('getObject', {
            Bucket: process.env.BUCKET_NAME,
            Key: filename,
            Expires: 100
        });
    }

    getUploadUrl(filename) {
        return this.getS3().getSignedUrl('putObject', {
            Bucket: process.env.BUCKET_NAME,
            Key: filename,
            Expires: 100
        });
    }
}
