const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
  firstname:{
    type:String,
    required: true
  },
  lastname:{
    type:String,
    required: true
  },
  middlename:{
    type:String,
    required: true
  },
  matric:{
    type:String,
    required: true
  },
  username:{
    type:String,
    required: true
  },
  password:{
    type: String,
  },
})
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema)