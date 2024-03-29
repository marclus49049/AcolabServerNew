// import express from 'express';
// import { leaderboard } from '../controller/userService.js';
// import {default as auth} from '../middleware/auth.js';

const express = require('express');
const auth = require('../middleware/auth');
const { leaderboard } = require('../controller/userService');
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
router.post('/', auth, leaderboard);

module.exports = router;
