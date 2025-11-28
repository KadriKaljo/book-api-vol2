import { Router } from 'express';
import * as AuthControllers from '../controllers/auth.controllers.js';
import { validateBody } from '../middlewares/validator.middleware.js';
import { authSchema } from '../validations/auth.validation.js';


const router = Router();

router.post('/register',validateBody(authSchema), AuthControllers.register);
router.post('/login',validateBody(authSchema), AuthControllers.login);

export default router;