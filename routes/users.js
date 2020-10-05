import express from 'express';
import { addUser, getUser, login } from '../controller/userService.js'
import {default as expressValidator} from 'express-validator';
import {default as auth} from '../middleware/auth.js'; 

const router = express.Router();
const {check} = expressValidator;


// all routers here are starting with /users 

router.post('/', [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please Enter a Valid Email").isEmail(),
    check("contact", "Please Enter Valid Number").isNumeric().isMobilePhone(),
    check("password", "Please Enter a Valid Password").isLength({
        min: 7
    })
], addUser);

router.post('/login',[
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ], login)

router.get('/', auth, getUser);

export default router;