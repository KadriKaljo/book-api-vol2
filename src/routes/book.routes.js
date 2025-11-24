import { Router } from 'express';
import { validate } from '../middlewares/validator.middleware.js';
import bookSchema from '../validations/book.validation.js';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/books.controllers.js';

const router = Router();

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', validate(bookSchema), createBook);
router.put('/books/:id', validate(bookSchema), updateBook);
router.delete('/books/:id', deleteBook);

export default router;