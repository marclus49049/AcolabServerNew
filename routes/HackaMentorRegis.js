const express = require('express');
const auth = require('../middleware/auth');
const { hackaMentor, addHacka, NullifyHacka } = require('../controller/hackaService');
const router = express.Router();

router.post('/add', auth, addHacka);

router.post('/save', auth, hackaMentor);

router.post('/null', auth, NullifyHacka);

module.exports = router;

