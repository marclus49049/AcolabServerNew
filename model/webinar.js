const mongoose = require('mongoose');

const webinar = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    speaker: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date:{
      type: String,
      required: true
    }
  });
  // export model user with UserSchema
  module.exports= mongoose.model("webinar", webinar);