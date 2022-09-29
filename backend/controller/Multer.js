// // @ts-nocheck
// import fs from "fs";
// import multer from "multer";
import picModel from "../model/image.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);

__dirname = __dirname.slice(0, 52);
// console.log(__dirname)

// METHOD: POST
// desc: uploading a single image to the server
export const uploadingFile = async (
  /** @type {any} */ req,
  /** @type {any} */ res
) => {
  try {
    let { file } = req;
    // console.log(file);
    let pathName = "./assets/images/" + file.filename;

    let temp = new picModel({
      picpath: pathName,
    });

    let savedTemp = await temp.save();

    if (!savedTemp) {
      res.status(400).json({ state: false, data: [], msg: "cannot saved" });
    }

    if (savedTemp) {
      res.status(200).json({
        state: true,
        data: { file, savedMongoDb: savedTemp },
        msg: "successfully uploaded",
      });
    }
  } catch (err) {
    res.status(400).json({ state: false, data: [], msg: err });
  }
};

// METHOD: GET
// desc: returning all pictures in images folder
export const getUploadedFiles = async (req, res) => {
  try {
    picModel.find((err, data) => {
      if (err) {
        console.log(err);
      } else if (data.length > 0) {
        res.json({ state: true, data, msg: "success" });
      } else {
        res.json({ state: true, data: {}, msg: "success" });
      }
    });
    // console.log("ok");
  } catch (err) {
    res.status(400).json({ state: false, data: {}, msg: err });
  }
};

// METHOD: GET
// desc: returning with Download
export const getUploadedFilesById = async (req, res) => {
  picModel.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(data)
      let saved = `${__dirname}/${data[0].picpath}`;
      res.sendFile(saved);
      // res.download(saved)
    }
  });
};
