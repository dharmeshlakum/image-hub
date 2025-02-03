import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { join } from "path";
import errorResponseMW from "../error/errorResponse";

// Image Storage
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        const filePath = join(__dirname, "../../assets/users");
        cb(null, filePath);
    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        const fileName = file.originalname.replaceAll(" ", "-") + Date.now() + ".png";
        cb(null, fileName);
    }
});

// check File Type
const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {

    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only images are allowed!"), false);

    };
    cb(null, true);

}
const multerInstance = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024,
    }
});

// Middleware : Profile Image Uploading
const profileImgUploadingMW = (req: Request, res: Response, next: NextFunction) => {

    try {
        const upload = multerInstance.single("image");
        upload(req, res, (err) => {

            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    errorResponseMW(res, 413, "File size is too large. Max allowed size is 5MB.")
                    return;
                }

                errorResponseMW(res, 400, err.message)
                return;

            } else if (err instanceof Error) {
                errorResponseMW(res, 400, err.message);

            } else {
                next(); // move to the next middleware
            }
        })

    } catch (error: any) {
        console.log("profile image file uploading middleware error :", error);
        errorResponseMW(res, 500, "Internal server error !")
    }
}

export default profileImgUploadingMW