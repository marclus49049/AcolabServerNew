const mongoose = require('mongoose');


// const UserSubSchema = mongoose.Schema({
//     username: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true
//     },
//     password: {
//       type: String,
//       required: true
//     },
//     contact: {
//       type: Number,
//       required: true
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now()
//     }
//   });

const sub_type = {
    "sub_type": {
        1:{
            "type":"1",
            "name":"kilo",
            "days":30
        },
        2:{
            "type":"2",
            "name":"mega",
            "days":60
        },
        3:{
            "type":"3",
            "name":"giga",
            "days":90
        }
    }
}
  
  // export model user with UserSchema
//   export default mongoose.model("userSub", UserSubSchema);
module.exports= sub_type;