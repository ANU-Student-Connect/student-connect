import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { FILE_UPLOAD_PATH, MAX_FILE_SIZE } from '../config/config.js';

// Ensure upload directory exists
if (!fs.existsSync(FILE_UPLOAD_PATH)) {
    fs.mkdirSync(FILE_UPLOAD_PATH, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
        // Generate unique filename
        cb(null, `${req.user.user_id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Check file type
const fileFilter = (req, file, cb) => { 
    // Allowed file types
    const filetypes = / jpeg | jpg | png | gif /;
    // Check file extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Images only!'), false);
    }
};

// Initialize upload instance
const upload = multer({
    storage: storage,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter: fileFilter,
});

const uploadAvatar = upload.single('avatar');
const uploadMessageAttachment = upload.array('messageAttachment', 5);

export { uploadAvatar, uploadMessageAttachment };
