import express from 'express';
import { userSub } from '../controller/userService.js';
import {default as auth} from '../middleware/auth.js'; 

const router = express.Router();
router.post('/', auth, userSub);

export default router;