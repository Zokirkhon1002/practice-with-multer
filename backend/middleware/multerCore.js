import multer from "multer";

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,callBackFunc) => {
        callBackFunc(null, './assets/images');
    },
    filename: (res,file,callBackFunc)=> {
        callBackFunc(null, Date.now() + "--" + file.originalname);
    },
});

export const upload = multer({storage: fileStorageEngine});
