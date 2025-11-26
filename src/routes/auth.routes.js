import { Router } from 'express';
import * as AuthControllers from '../controllers/auth.controllers.js'

const router = Router();

router.post('/register', AuthControllers.register);
router.post('/login', AuthControllers.login);

export default router;