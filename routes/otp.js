const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const user = require('../model/user');
const OTP = require('../model/otp');
router.post('/validateotp', (req, res) => {
	OTP
		.findOne({email:req.body.email})
		.exec()
		.then((user) => {
			if(user['otp']==req.body.otp){
				res.status(200).json({message:"validated"})
			}else{
				res.status(401).json({message:"incorrect"})
			}
		})
		.catch((err)=>{
			res.status(400).json(err)
		});
});

module.exports = router;
