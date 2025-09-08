import { Router } from 'express';
import { addImage, getImages } from '../controllers/image.controllers';
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../..', 'images')); // прозрачнее и надежнее
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', getImages);
// Добавить новую изображение
router.post('/', upload.single('image'), addImage);


export default router;
