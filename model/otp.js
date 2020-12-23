const mongoose = require('mongoose');
const {otpSchema}=require('./dbName')


const otp = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: Number,
		required: true,
	},
	createAt: {
		type: Date,
		default: Date.now(),
		//index: { expires: 60*15}
	}
});
// export model user with UserSchema
module.exports = mongoose.model(otpSchema, otp);
