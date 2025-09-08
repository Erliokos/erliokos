import { Router } from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct, getProductsByCategoryId } from '../controllers/product.controller';

const router = Router();


// Получить все продукты
router.get('/', getProducts);

router.get('/:category_id', getProductsByCategoryId);

// Добавить новый продукт
router.post('/', addProduct);

// Обновить продукт
router.put('/:id', updateProduct);

// Удалить продукт
router.delete('/:id', deleteProduct);

export default router;
