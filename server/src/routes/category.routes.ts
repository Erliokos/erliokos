import { Router } from 'express';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../controllers/category.controller';
import { authMiddleware } from '../middlewares/auth.middlewares';

const router = Router();

router.get('/', authMiddleware, getCategories);

// Добавить новую категорию
router.post('/', addCategory);

// Обновить категорию
router.put('/:id', updateCategory);

// Удалить категорию
router.delete('/:id', deleteCategory);

export default router;
