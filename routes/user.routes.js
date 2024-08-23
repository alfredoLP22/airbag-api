import express from 'express';
import { createUser, loginUser } from '../controllers/user.controller.js';
import { validateUser, validateUserLogin } from '../middlewares/validateUser.js';

const router = express.Router();

router.post('/register', validateUser, createUser);
router.post('/login', validateUserLogin, loginUser);

export default router;