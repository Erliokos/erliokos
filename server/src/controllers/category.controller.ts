import { Request, Response } from 'express';
import { pool } from '../db';


export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM category');
    res.json(result.rows); // Возвращаем все строки из таблицы category
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

// Добавить новую категорию
export const addCategory = async (req: Request, res: Response) => {
  const { link, name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO category (link, name) VALUES ($1, $2) RETURNING *',
      [link, name]
    );
    res.status(201).json(result.rows[0]); // Возвращаем добавленную категорию
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding category' });
  }
};

// Обновить категорию
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params; // Получаем id категории из URL
  const { link, name } = req.body;

  try {
    const result = await pool.query(
      'UPDATE category SET link = $1, name = $2 WHERE id = $3 RETURNING *',
      [link, name, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Возвращаем обновленную категорию
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating category' });
  }
};

// Удалить категорию
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params; // Получаем id категории из URL

  try {
    const result = await pool.query(
      'DELETE FROM category WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length > 0) {
      res.json({ message: 'Category deleted' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting category' });
  }
};

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Операции с категориями
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags:
 *       - Categories
 *     description: Получить все категории
 *     responses:
 *       200:
 *         description: Список категорий
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   link:
 *                     type: string
 *   post:
 *     tags:
 *       - Categories
 *     description: Добавить новую категорию
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       201:
 *         description: Категория добавлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 link:
 *                   type: string
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     description: Обновить категорию
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID категории
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       200:
 *         description: Категория обновлена
 *   delete:
 *     tags:
 *       - Categories
 *     description: Удалить категорию
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID категории
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Категория удалена
 *       404:
 *         description: Категория не найдена
 */
