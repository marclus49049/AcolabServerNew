const express = require('express');
const auth = require('../middleware/auth');
const { addorder } = require('../controller/userService');

const router = express.Router();
router.post('/', auth, addorder);

module.exports = router;
