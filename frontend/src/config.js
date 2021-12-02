const apiURL = "http://localhost:3900";


const resumeConfig = {
    bucketName: "uber-eats-proto",
    dirName: "resumeUpload/" /* optional */,
    region: "us-east-2",
    accessKeyId: "AKIAUR4W3HRGHUKUAVWI",
    secretAccessKey: "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",
};

const coverConfig = {
    bucketName: "uber-eats-proto",
    dirName: "coverLetterUpload/" /* optional */,
    region: "us-east-2",
    accessKeyId: "AKIAUR4W3HRGHUKUAVWI",
    secretAccessKey: "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",
};

const companyPhotosConfig = {
    bucketName: "uber-eats-proto",
    dirName: "cpmpanyPhotosUpload/" /* optional */,
    region: "us-east-2",
    accessKeyId: "AKIAUR4W3HRGHUKUAVWI",
    secretAccessKey: "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",
};

module.exports.apiURL = apiURL;
module.exports.resumeConfig = resumeConfig;
module.exports.coverConfig = coverConfig;
module.exports.companyPhotosConfig = companyPhotosConfig;