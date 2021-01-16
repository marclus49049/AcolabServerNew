const mongoose = require('mongoose');
const { webinarSchema } = require('./dbName');

const webinar = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	category:{
		type:String,
		required:true
	},
	link: {
		type: Object,
		required: true,
	},
	action: {
		type: String,
		required: true,
	},
	topicDescription: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	designation: {
		type: String,
		required: true,
	},
	preferredCaption:{
		type:[String],
		required:false
	},
	preknowledge:{
		type:String,
		required:false
	},
});
// export model user with UserSchema
module.exports = mongoose.model(webinarSchema, webinar);
