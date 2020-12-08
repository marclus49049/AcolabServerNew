const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const jwt = require('jsonwebtoken');

const user = require('../model/user');
const OTP = require('../model/otp');
router.post('/validateotp', (req, res) => {
	OTP
		.findOne({email:req.body.email})
		.exec()
		.then((user) => {
			if(user['otp']==req.body.otp){
				const payload = {
					auser: {
						id: user['_id'],
					},
				};
				jwt.sign(
					payload,
					'secret',
					{
						expiresIn: 10000,
					},
					(err, token) => {
						if (err) throw err;
						res.status(200).json({
							token,
						});
					}
				);
				//res.status(200).json({message:payload})
			}else{
				res.status(200).json({message:"incorrect"})
			}
		})
		.catch((err)=>{
			res.status(400).json(err)
		});
});

module.exports = router;
