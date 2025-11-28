import { Router } from 'express';
import { validateBody, validateQuery } from '../middlewares/validator.middleware.js';
import bookSchema from '../validations/book.validation.js';
import * as BookControllers from '../controllers/books.controllers.js';
import { bookQuerySchema } from '../validations/bookQuery.validation.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';


const router = Router();

// router.use(authenticateToken); // kasutab autentimist, kui kasutaja on sisse loginud, siis saab lugeda books

router.get('/books', validateQuery(bookQuerySchema), BookControllers.getAllBooks); // kasutab validatorit, kui kasutaja on sisse loginud, siis saab lugeda books
router.get('/books/:id', BookControllers.getBookById); // 
router.post('/books', authenticateToken, validateBody(bookSchema), BookControllers.createBook); // kasutab validatorit, kui kasutaja on sisse loginud, siis saab luua booki
router.put('/books/:id', authenticateToken, validateBody(bookSchema), BookControllers.updateBook); // kasutab validatorit, kui kasutaja on sisse loginud, siis saab lugeda booki
router.delete('/books/:id', authenticateToken, BookControllers.deleteBook); // kasutab validatorit, kui kasutaja on sisse loginud, siis saab kustutada booki

export default router;