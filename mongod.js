const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb+srv://:@cluster0.iezdyjg.mongodb.net/YouTube?retryWrites=true&w=majority");

const userSchema = new mongoose.Schema({
  email: {
    type:String,Number
  },
  password: {
    type:String,Number
  }
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);