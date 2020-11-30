// import express from 'express';
// import { userSub } from '../controller/userService.js';
// import {default as auth} from '../middleware/auth.js';

const express = require('express');
const { userSub } = require('../controller/userService');
const auth = require('../middleware/auth');

const router = express.Router();
router.post('/', auth, userSub);

module.exports = router;
