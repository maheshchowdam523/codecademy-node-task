const { config, S3 } = require("aws-sdk");
config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const bucketName = process.env.AWS_BUCKET_NAME;
var s3 = new S3();
const storage = {
  s3: s3,
  bucket: bucketName,
  // Set public read permissions
  acl: "public-read",
  // Set key/ filename as original uploaded name
  key: function (req, file, cb) {
    cb(null, file.originalname);
  },
};

module.exports = { storage };
