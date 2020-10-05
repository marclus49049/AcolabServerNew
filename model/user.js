const mongoose = require('mongoose');

const UserSubInfo = {
    plan_id:0,
    current_plan:"none",
    expire:Date.now()
  };

const UserSchema = mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    contact: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    credits: {
      type: Number,
      default: 0
    },
    leaderboard: {
      type: Number,
      default: 0
    }, sub_info: {
      type: Object,
      default: UserSubInfo
    },
  });
  
  // export model user with UserSchema
  module.exports= mongoose.model("user", UserSchema);