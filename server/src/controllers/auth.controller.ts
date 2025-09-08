import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

export class AuthController {
  // Регистрация
  static async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      // Проверяем, есть ли пользователь
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Хешируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      // Сохраняем в БД
      const newUser = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
        [username, hashedPassword]
      );

      res.status(201).json({ user: newUser.rows[0] });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }

  // Логин
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      console.log('username', username);
      console.log('password', password);
      

      const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = result.rows[0];

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Генерируем токен
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        // secure: true, // включить в проде (HTTPS)
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ message: "Logged in", user: { id: user.id, username: user.username } });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }

  // Выход
  static async logout(req: Request, res: Response) {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  }

  // Проверка текущего пользователя
  static async me(req: Request, res: Response) {
    res.json({ user: (req as any).user });
  }
}

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Регистрация нового пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Пользователь уже существует
 *
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Авторизация пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверные данные
 *
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Выход пользователя
 *     responses:
 *       200:
 *         description: Успешный выход
 *
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Получить данные текущего пользователя
 *     responses:
 *       200:
 *         description: Текущий пользователь
 *       401:
 *         description: Неавторизован
 */
