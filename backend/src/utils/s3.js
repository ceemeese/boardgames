const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();


const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccess = process.env.SECRET_ACCESS;
const sessionToken = process.env.SESSION_TOKEN;

const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccess,
        sessionToken: sessionToken
    }
})

module.exports = {
    s3,
    bucketName
}

