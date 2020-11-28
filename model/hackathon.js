const mongoose = require('mongoose');

const HackathonSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	},
	status:{
		type:String,
		default:"upcoming"
	},
    Mentorlist:{
		type:[Object],unique:false
	},
    participantlist:{
		type:[Object],unique:false
	}
  });

  // export model user with UserSchema
  module.exports= mongoose.model("hackathon", HackathonSchema);