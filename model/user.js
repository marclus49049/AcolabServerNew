const mongoose = require('mongoose');
const {userSchema}=require('./dbName')

var d = new Date();
var addition = 60;
// console.log(d.getMonth());
d.setDate(d.getDate() + addition);
const UserSubInfo = {
	plan_id: 2,
	current_plan: 'mega',
	expire: d,
};

const UserSchema = mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique:true
	},
	password: {
		type: String,
		required: true,
	},
	contact: {
		type: Number,
		required: true,
	},
	countryCode: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	credits: {
		type: Number,
		default: 0,
	},
	leaderboard: {
		type: Number,
		default: 0,
	},
	sub_info: {
		type: Object,
		default: UserSubInfo,
	},
	webinarlist: {
		type: [String],
		unique: false,
	},
	orderlist: [Object],
	hackathonlist: {
		type: [Object],
		unique: false,
	},
	profile:{
		type:Object,
		required:false
	},
	qualification:{
		type:String,
		required:false
	},
	socialMediaLinks:{
		type:Object,
		required:false
	},
	speakerWebinar:{
		type:[Object]
	}
});

// export model user with UserSchema
module.exports = mongoose.model(userSchema, UserSchema);
