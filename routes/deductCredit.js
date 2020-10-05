import express from 'express';
import {default as auth} from '../middleware/auth.js'; 
import { deductCredit } from '../controller/userService.js';

// //user schema
// var user={
// 	username: 'User',
// 	email: 'User@domain.com',
// 	password: 'XpassworsX',
// 	contact: '9856327410',
// 	createdAt: Date.now(),
// 	credits:150,
// 	leaderboard:10
// };
const router = express.Router();
router.post('/', auth, deductCredit);

export default router;