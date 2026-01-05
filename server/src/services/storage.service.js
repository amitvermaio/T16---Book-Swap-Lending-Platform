import imagekit from "../config/imagekit.js";
import crypto from "crypto";
import path from "path";

const uploadToImageKit = async (file, folderName) => {
  return new Promise((resolve, reject) => {
    const uniqueSuffix = crypto.randomBytes(5).toString('hex'); 

    const fileExt = path.extname(file.originalname); 
    const fileNameWithoutExt = path.basename(file.originalname, fileExt);
    const uniqueFileName = `${fileNameWithoutExt}-${uniqueSuffix}${fileExt}`;

    imagekit.upload({
      file: file.buffer,
      fileName: uniqueFileName, 
      folder: folderName,
    }, (err, response) => {
      console.log("err", err);
      if (err) reject(err);
      else resolve(response.url);
    });
  });
};

export { uploadToImageKit };