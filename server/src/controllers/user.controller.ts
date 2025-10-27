import { Request, Response } from "express";
import { pool } from "../db";
import path from "path";
import fs from "fs";

export class UserController {
  // получить профиль
  static async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const result = await pool.query("SELECT id, username, avatar FROM users WHERE id = $1", [
        userId,
      ]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error("GetProfile error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }

  // получить пользователя по username
  static async getUserByName(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const result = await pool.query(
        "SELECT id, username, avatar_url FROM users WHERE username ILIKE $1",
        [username]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error("GetUserByName error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }

  // обновить аватарку
  static async updateAvatar(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // сохраняем путь к файлу
      const filePath = path.join("uploads", req.file.filename);

      // записываем в БД
      const result = await pool.query(
        "UPDATE users SET avatar_url = $1 WHERE id = $2 RETURNING id, username, avatar_url",
        [filePath, userId]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error("UpdateAvatar error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
}
