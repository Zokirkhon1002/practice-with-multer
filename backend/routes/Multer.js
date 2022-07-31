import { Router } from "express";

// importing Controllers
import { uploadingFile, getUploadedFiles, getUploadedFilesById } from "../controller/Multer.js";

// importing multer Core Engine
import { upload } from "../middleware/multerCore.js";


const router = Router();

// routes
router.get("/single", getUploadedFiles);
router.get("/single/:id", getUploadedFilesById);
router.post("/single", upload.single('image'), uploadingFile);

export default router;
