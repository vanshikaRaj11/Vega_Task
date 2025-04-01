const cloudinary = require("../config/cloudinary.config");
const { Readable } = require("stream");

const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      return reject(new Error("No file buffer"));
    }
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result.secure_url);
    });

    const stream = Readable.from(file.buffer);
    stream.pipe(uploadStream);
  });
};

module.exports = uploadImage;
