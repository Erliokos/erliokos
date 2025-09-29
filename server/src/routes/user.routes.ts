import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";
import multer from "multer";

const router = Router();

// настройка multer для загрузки файлов
const upload = multer({ dest: "uploads/" });

// получить данные о пользователе (можно расширять)
router.get("/profile", authMiddleware, UserController.getProfile);

router.get("/by-name/:username", UserController.getUserByName);

// обновить аватарку
router.post(
  "/avatar",
  authMiddleware,
  upload.single("avatar"), // "avatar" должно совпадать с именем поля в FormData
  UserController.updateAvatar
);

export default router;
