var AWS = require('aws-sdk');

export class ImagesService {
    constructor(private s3) {}

    getImageUrl(filename) {
        return this.s3.getSignedUrl('getObject', {
            Bucket: process.env.BUCKET_NAME,
            Key: filename,
            Expires: 100
        });
    }

    getUploadUrl(filename) {
        return this.s3.getSignedUrl('putObject', {
            Bucket: process.env.BUCKET_NAME,
            Key: filename,
            Expires: 100
        });
    }
}
