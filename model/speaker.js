const mongoose = require('mongoose');

const speaker = mongoose.Schema({
	userId:{
		type:String,
		required:true
	},
	profile:{
		type:Object,
		required:false
	},
	description: {
		type: String,
		required: true,
	},
	qualification:{
		type:String,
		required:true
	},
	socialMediaLinks:{
		type:Object,
		required:false
	},
	speakerWebinar:{
		type:[String]
	}

})