import multer from "multer";

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        return cb(null, true); // accept file
    }

    return cb(
        new Error("Invalid file type. Only JPEG and PNG images are allowed."),
        false
    ); // reject file
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
    },
});

export default upload;
