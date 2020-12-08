const express = require('express');
const {
	addUser,
	getUser,
	login,
	updateUserProfile,
	resetPassword,
	forgotPassword
} = require('../controller/userService');
// const addUser = require('../controller/userService')
const expressValidator = require('express-validator');
const auth = require('../middleware/auth');

const router = express.Router();
const { check } = expressValidator;

// all routers here are starting with /users

router.post(
	'/',
	[
		// check("username", "Please Enter a Valid Username").not().isEmpty(),
		check('email', 'Please Enter a Valid Email').isEmail(),
		check('contact', 'Please Enter Valid Number').isNumeric().isMobilePhone(),
		check('password', 'Please Enter a Valid Password').isLength({
			min: 7,
		}),
	],
	addUser
);

router.post(
	'/login',
	[
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a valid password').isLength({
			min: 7,
		}),
	],
	login
);

router.get('/', auth, getUser);

router.put('/updateuser', auth, updateUserProfile);

router.put('/resetpassword',auth,resetPassword);

router.put('/forgotpassword',forgotPassword);
module.exports = router;
