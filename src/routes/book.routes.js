import { Router } from 'express';
import { validateBody, validateQuery } from '../middlewares/validator.middleware.js';
import bookSchema from '../validations/book.validation.js';
import * as BookControllers from '../controllers/books.controllers.js';
import { bookQuerySchema } from '../validations/bookQuery.validation.js';


const router = Router();

router.get('/books', validateQuery(bookQuerySchema), BookControllers.getAllBooks);
router.get('/books/:id', BookControllers.getBookById);
router.post('/books', validateBody(bookSchema), BookControllers.createBook);
router.put('/books/:id', validateBody(bookSchema), BookControllers.updateBook);
router.delete('/books/:id', BookControllers.deleteBook);

export default router;