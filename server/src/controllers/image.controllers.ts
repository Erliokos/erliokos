import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs'

const imagesDir = path.join(__dirname, '../../images'); // путь к папке с картинками

export const getImages = async (req: Request, res: Response) => {
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Не удалось прочитать папку' });
    }
    // Можно фильтровать только картинки по расширениям:
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    // Вернуть массив имен или путей:
    res.json(imageFiles);
  });
};

export const addImage = async (req: Request, res: Response) => {
  
  if (!req.file) {
    return res.status(400).json({ error: 'Файл не загружен' });
  }
  res.json({ message: 'Загружено успешно!', filename: req.file.filename, path: imagesDir });
};
