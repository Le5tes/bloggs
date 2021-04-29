import { mockS3 } from "../utils/mock-s3-presigned";

const getS3 = () => {
    if (process.env.PRODENV ) {
        var AWS = require('aws-sdk');
        // var credentials = {
        //     accessKeyId: process.env.S3_ACCESS_KEY,
        //     secretAccessKey : process.env.S3_SECRET_KEY
        // };
        // AWS.config.update({credentials: credentials, region: process.env.REGION});
        return new AWS.S3();
    } else {
        return mockS3
    }
}

export const s3 = getS3();