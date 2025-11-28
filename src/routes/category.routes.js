import { Router } from 'express';
import { validateBody } from '../middlewares/validator.middleware.js';
import categorySchema from '../validations/category.validation.js';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categories.controllers.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', authenticateToken, validateBody(categorySchema), createCategory);
router.put('/categories/:id', authenticateToken, validateBody(categorySchema), updateCategory);
router.delete('/categories/:id', authenticateToken, deleteCategory);

export default router;


