const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate')
mongoose.connect("mongodb+srv://deadly7036:deadly7036@cluster0.iezdyjg.mongodb.net/YouTube?retryWrites=true&w=majority");

const userSchema = new mongoose.Schema({
  email: {
    type:String,Number
  },
  password: {
    type:String,Number
  },
  googleId:String
});
userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);