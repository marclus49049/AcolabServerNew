const express = require('express');
const auth = require('../middleware/auth');
const { hackaMentor, addHacka, NullifyHacka } = require('../controller/hackaService');
const router = express.Router();

//add user to hackathon list
router.post('/registerMentor', auth, hackaMentor);

//cancel the user participation
router.post('/cancel', auth, NullifyHacka);

module.exports = router;
