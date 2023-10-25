const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://:@cluster0.iezdyjg.mongodb.net/YouTube?retryWrites=true&w=majority");

const userSchema = new mongoose.Schema({
  email: {
    type:String
  },
  password: {
    type:String
  }
});


module.exports = mongoose.model("User", userSchema);