import { Request, Response } from 'express';
import { pool } from '../db';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows); // Возвращаем все строки из таблицы products
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const getProductsByCategoryId = async (req: Request, res: Response) => {
  const { category_id } = req.params;

  try {

    const result = await pool.query('SELECT * FROM products WHERE category_id = $1', [category_id]);

    res.json(result.rows.length);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products by category' });
  }
};


export const addProduct = async (req: Request, res: Response) => {
  const { category_id, category_link, name, price, sale, images, description, rating, voteCount, remains, model } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (category_id, category_link, name, price, sale, images, description, rating, vote_count, remains, model) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [category_id, category_link, name, price, sale, images, description, rating, voteCount, remains, model]
    );
    res.status(201).json(result.rows[0]); // Возвращаем добавленный продукт
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product' });
  }
};

// Обновить продукт
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params; // Получаем id продукта из URL
  const { category_id, category_link, name, price, sale, images, description, rating, voteCount, remains, model } = req.body;

  try {
    const result = await pool.query(
      'UPDATE products SET category_id = $1, category_link = $2, name = $3, price = $4, sale = $5, images = $6, description = $7, rating = $8, vote_count = $9, remains = $10, model = $11 WHERE id = $12 RETURNING *',
      [category_id, category_link, name, price, sale, images, description, rating, voteCount, remains, model, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Возвращаем обновленный продукт
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Удалить продукт
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params; // Получаем id продукта из URL

  try {
    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length > 0) {
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Операции с продуктами
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     description: Получить все продукты
 *     responses:
 *       200:
 *         description: Список продуктов
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
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   vote_count:
 *                     type: number
 *   post:
 *     tags:
 *       - Products
 *     description: Добавить новый продукт
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               sale:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               rating:
 *                 type: number
 *               voteCount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Продукт добавлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 categoryId:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 sale:
 *                   type: number
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                 description:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 voteCount:
 *                   type: number
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     description: Обновить продукт
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID продукта
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               sale:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               rating:
 *                 type: number
 *               voteCount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Продукт обновлен
 *   delete:
 *     tags:
 *       - Products
 *     description: Удалить продукт
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID продукта
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Продукт удален
 *       404:
 *         description: Продукт не найден
 */


