import { mockS3 } from "../utils/mock-s3-presigned";

export const getS3 = () => {
    if (process.env.PRODENV ) {
        var AWS = require('aws-sdk');
        AWS.config.update({region: process.env.REGION});
        return new AWS.S3();
    } else {
        return mockS3
    }
}
